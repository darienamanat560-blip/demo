/**
 * TrueChem Omnisend Service
 * 
 * Central module for all Omnisend API operations.
 * Used by all backend routes - NEVER call Omnisend directly from frontend.
 * 
 * Features:
 * - Idempotent contact operations (safe to call multiple times)
 * - Automatic retry on rate limits
 * - Type-safe event tracking
 * - Comprehensive error handling
 */

import { NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface OmnisendContact {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  country?: string
  customProperties?: Record<string, string | number | boolean>
}

export interface OmnisendEvent {
  email: string
  eventName: string
  eventData?: Record<string, any>
}

export interface OmnisendResult {
  success: boolean
  contactID?: string
  error?: string
  statusCode?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const OMNISEND_API_BASE = 'https://api.omnisend.com/v3'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

function getApiKey(): string {
  const key = process.env.OMNISEND_API_KEY
  if (!key) {
    throw new Error('OMNISEND_API_KEY environment variable is not set')
  }
  return key
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP Client with Retry Logic
// ─────────────────────────────────────────────────────────────────────────────

async function omnisendRequest(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
  retryCount = 0
): Promise<Response> {
  const url = `${OMNISEND_API_BASE}${endpoint}`
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': getApiKey(),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // Retry on rate limit (429)
  if (response.status === 429 && retryCount < MAX_RETRIES) {
    const delay = RETRY_DELAY_MS * Math.pow(2, retryCount) // Exponential backoff
    console.log(`Rate limited. Retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`)
    await new Promise(resolve => setTimeout(resolve, delay))
    return omnisendRequest(endpoint, method, body, retryCount + 1)
  }

  return response
}

// ─────────────────────────────────────────────────────────────────────────────
// Core Contact Operations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create or update a contact in Omnisend.
 * This is idempotent - safe to call multiple times for the same email.
 * 
 * @param email - Contact email (required)
 * @param properties - Contact properties (firstName, lastName, phone, etc.)
 * @param tags - Array of tags to add to the contact
 * @returns OmnisendResult with contactID if successful
 */
export async function createOrUpdateContact(
  email: string,
  properties: Omit<OmnisendContact, 'email'> = {},
  tags: string[] = []
): Promise<OmnisendResult> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    const payload = {
      email,
      status: 'subscribed',
      statusDate: new Date().toISOString(),
      channels: {
        email: {
          status: 'subscribed',
          statusDate: new Date().toISOString()
        }
      },
      firstName: properties.firstName || null,
      lastName: properties.lastName || null,
      phone: properties.phone || null,
      country: properties.country || null,
      tags: tags.length > 0 ? tags : undefined,
      customProperties: properties.customProperties || undefined,
    }

    const response = await omnisendRequest('/contacts', 'POST', payload)
    const responseText = await response.text()

    // Handle duplicate contact (409) - this is actually success
    if (response.status === 409) {
      console.log(`Contact already exists: ${email}`)
      return { success: true, error: 'Contact already exists (this is OK)' }
    }

    if (!response.ok) {
      console.error(`Omnisend createOrUpdateContact error:`, response.status, responseText)
      return { 
        success: false, 
        error: responseText || 'Failed to create contact',
        statusCode: response.status 
      }
    }

    let data: any = {}
    try {
      data = JSON.parse(responseText)
    } catch (_) {
      // Empty response is OK
    }

    console.log(`✓ Contact created/updated: ${email}`)
    return { 
      success: true, 
      contactID: data.contactID 
    }

  } catch (error) {
    console.error('createOrUpdateContact error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Add tags to an existing contact.
 * Creates the contact if it doesn't exist.
 * 
 * @param email - Contact email
 * @param tags - Array of tags to add
 */
export async function addTags(
  email: string,
  tags: string[]
): Promise<OmnisendResult> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    if (!tags || tags.length === 0) {
      return { success: false, error: 'No tags provided' }
    }

    // Omnisend doesn't have a dedicated "add tags" endpoint
    // We need to PATCH the contact with new tags
    // First, get existing contact to merge tags (or create if doesn't exist)
    const existingContact = await getContact(email)
    
    if (!existingContact.success) {
      // Contact doesn't exist - create with tags
      return createOrUpdateContact(email, {}, tags)
    }

    // Merge tags (avoid duplicates)
    const existingTags = existingContact.tags || []
    const mergedTags = Array.from(new Set([...existingTags, ...tags]))

    const payload = {
      tags: mergedTags
    }

    const response = await omnisendRequest(`/contacts/${email}`, 'PATCH', payload)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`addTags error for ${email}:`, response.status, errorText)
      return { success: false, error: errorText, statusCode: response.status }
    }

    console.log(`✓ Tags added to ${email}:`, tags)
    return { success: true }

  } catch (error) {
    console.error('addTags error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Remove tags from a contact.
 * 
 * @param email - Contact email
 * @param tags - Array of tags to remove
 */
export async function removeTags(
  email: string,
  tags: string[]
): Promise<OmnisendResult> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    if (!tags || tags.length === 0) {
      return { success: false, error: 'No tags provided' }
    }

    // Get existing contact
    const existingContact = await getContact(email)
    
    if (!existingContact.success || !existingContact.tags) {
      return { success: false, error: 'Contact not found or has no tags' }
    }

    // Remove specified tags
    const remainingTags = existingContact.tags.filter(t => !tags.includes(t))

    const payload = {
      tags: remainingTags
    }

    const response = await omnisendRequest(`/contacts/${email}`, 'PATCH', payload)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`removeTags error for ${email}:`, response.status, errorText)
      return { success: false, error: errorText, statusCode: response.status }
    }

    console.log(`✓ Tags removed from ${email}:`, tags)
    return { success: true }

  } catch (error) {
    console.error('removeTags error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Get a contact by email.
 * Internal helper for tag operations.
 */
async function getContact(email: string): Promise<any> {
  try {
    const response = await omnisendRequest(`/contacts/${email}`, 'GET')
    
    if (!response.ok) {
      return { success: false }
    }

    const data = await response.json()
    return { success: true, ...data }

  } catch (error) {
    return { success: false }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Event Tracking for Automations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Track a custom event for a contact.
 * Used to trigger Omnisend automations.
 * 
 * Supported events for TrueChem automations:
 * - product_viewed → browse abandonment
 * - add_to_cart → cart abandonment
 * - checkout_started → checkout abandonment  
 * - order_placed → post-purchase flow
 * - back_in_stock_requested → stock notification
 * 
 * @param email - Contact email
 * @param eventName - Event name (use standard names above)
 * @param eventData - Event properties (product_id, order_id, etc.)
 */
export async function trackEvent(
  email: string,
  eventName: string,
  eventData: Record<string, any> = {}
): Promise<OmnisendResult> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    if (!eventName) {
      return { success: false, error: 'Event name is required' }
    }

    const payload = {
      email,
      eventName,
      eventData,
      eventTimestamp: new Date().toISOString()
    }

    const response = await omnisendRequest('/events', 'POST', payload)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`trackEvent error for ${email}:`, response.status, errorText)
      return { success: false, error: errorText, statusCode: response.status }
    }

    console.log(`✓ Event tracked: ${eventName} for ${email}`)
    return { success: true }

  } catch (error) {
    console.error('trackEvent error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Update custom properties on a contact.
 * Useful for storing metadata like signup_source, clerk_user_id, etc.
 * 
 * @param email - Contact email
 * @param properties - Custom properties to set
 */
export async function updateCustomProperties(
  email: string,
  properties: Record<string, string | number | boolean>
): Promise<OmnisendResult> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    const payload = {
      customProperties: properties
    }

    const response = await omnisendRequest(`/contacts/${email}`, 'PATCH', payload)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`updateCustomProperties error for ${email}:`, response.status, errorText)
      return { success: false, error: errorText, statusCode: response.status }
    }

    console.log(`✓ Custom properties updated for ${email}`)
    return { success: true }

  } catch (error) {
    console.error('updateCustomProperties error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export const omnisend = {
  createOrUpdateContact,
  addTags,
  removeTags,
  trackEvent,
  updateCustomProperties,
}
