# 🚀 TRUECHEM COMPLETE DEPLOYMENT GUIDE

**Everything you need to deploy your complete e-commerce site**

---

## ⏱️ TOTAL TIME: 60 Minutes

- Clerk setup: 10 min
- Supabase setup: 15 min  
- Local testing: 15 min
- Deploy to Vercel: 10 min
- Production testing: 10 min

---

## ✅ WHAT YOU'RE GETTING

**Complete Working Features:**
- ✅ Full e-commerce site (your existing TruchemWebsite)
- ✅ User authentication (Clerk)
- ✅ Order management system
- ✅ Database storage (Supabase)
- ✅ Checkout flow
- ✅ Order history
- ✅ Customer accounts

**Ready for Later:**
- 🔌 PayRio payments (when certified)
- 🔌 Pearl fulfillment (when ready)

---

## 📋 STEP 1: CREATE CLERK ACCOUNT (10 minutes)

### 1.1 Sign Up for Clerk

1. Go to https://clerk.com
2. Click "Start building for free"
3. Sign up with your email
4. Verify your email

### 1.2 Create Application

1. Click "Create application"
2. Application name: **truechem**
3. Select sign-in options:
   - ✅ Email
   - ✅ Google (recommended)
   - ✅ GitHub (optional)
4. Click "Create application"

### 1.3 Get API Keys

You'll see your keys immediately:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**COPY THESE NOW** - Save them somewhere safe!

### 1.4 Configure Paths

1. In Clerk dashboard, go to "Paths" (left sidebar)
2. Set these values:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in redirect: `/`
   - After sign-up redirect: `/`
3. Click "Save"

---

## 📋 STEP 2: SET UP SUPABASE DATABASE (15 minutes)

### 2.1 Get Supabase Credentials

You said you already created a Supabase account and database. Perfect!

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** (gear icon) → **API**
4. Copy these 3 values:

```
Project URL: https://xxxxx.supabase.co
anon public: eyJhbGc...
service_role: eyJhbGc... (different key!)
```

### 2.2 Create Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New query"
3. **Copy the ENTIRE contents** of `schema.sql` from this package
4. **Paste** into the SQL editor
5. Click **"RUN"** (bottom right)
6. You should see: **"Success. No rows returned"**

### 2.3 Verify Tables Created

1. Go to **Table Editor** (left sidebar)
2. You should see 4 new tables:
   - ✅ orders
   - ✅ order_events
   - ✅ products
   - ✅ discount_codes

**If you don't see these tables, the schema didn't run correctly. Try again.**

---

## 📋 STEP 3: CONFIGURE ENVIRONMENT VARIABLES (5 minutes)

### 3.1 Create .env.local File

1. In your project root, create a file named `.env.local`
2. Copy this template:

```bash
# ==================================
# CLERK AUTHENTICATION
# ==================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ==================================
# SUPABASE DATABASE
# ==================================
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...YOUR_ANON_KEY
SUPABASE_SERVICE_KEY=eyJhbGc...YOUR_SERVICE_KEY

# ==================================
# APP URL
# ==================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ==================================
# LEAVE BLANK FOR NOW
# ==================================
PAYRIO_API_KEY=
PAYRIO_PUBLISHABLE_KEY=
PAYRIO_WEBHOOK_SECRET=
PEARL_API_URL=
PEARL_API_KEY=
```

3. **Replace** all the placeholder values with your actual keys
4. **Save** the file

---

## 📋 STEP 4: TEST LOCALLY (15 minutes)

### 4.1 Install Dependencies

```bash
npm install
```

Wait for installation to complete (2-3 minutes).

### 4.2 Start Development Server

```bash
npm run dev
```

You should see:
```
 ▲ Next.js 14.2.25
 - Local:        http://localhost:3000
 - Ready in 3.2s
```

### 4.3 Test Authentication

1. **Open** http://localhost:3000
2. **Sign up** for an account
   - Use your email
   - Or use "Continue with Google"
3. **Verify** you're signed in
   - Should see your name/email somewhere
   - Should stay signed in when refreshing

### 4.4 Test Cart & Checkout

1. **Add** a product to cart
2. **View** cart
3. **Click** "Checkout" button
4. Should navigate to `/checkout` page
5. **Fill in** shipping address:
   - Name: Test User
   - Address: 123 Main St
   - City: Los Angeles
   - State: CA
   - ZIP: 90001
6. **Click** "Complete Order"
7. Should see **order confirmation** page
8. Note your order number

### 4.5 Verify in Supabase

1. **Go to** Supabase dashboard
2. **Table Editor** → **orders** table
3. **You should see** your test order!
4. Check all the fields are filled in correctly

### 4.6 Test Order History

1. **Go to** http://localhost:3000/account/orders
2. **You should see** your order listed
3. Click on the order to see details

### 4.7 Check for Errors

Open browser DevTools (F12):
- **Console tab**: Should have NO red errors
- **Network tab**: All requests should be 200/OK

**If you see errors, STOP and fix them before deploying.**

---

## 📋 STEP 5: DEPLOY TO VERCEL (10 minutes)

### 5.1 Add Environment Variables to Vercel

1. **Go to** Vercel dashboard (https://vercel.com)
2. **Select** your truechem project
3. **Go to** Settings → Environment Variables
4. **Add** ALL these variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_test_...
CLERK_SECRET_KEY = sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /

NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_KEY = eyJhbGc...

NEXT_PUBLIC_APP_URL = https://truechem.io

PAYRIO_API_KEY = (leave blank)
PAYRIO_PUBLISHABLE_KEY = (leave blank)
PAYRIO_WEBHOOK_SECRET = (leave blank)
PEARL_API_URL = (leave blank)
PEARL_API_KEY = (leave blank)
```

**IMPORTANT:** For `NEXT_PUBLIC_APP_URL`, use your actual domain!

5. **Click "Save"** for each variable

### 5.2 Commit and Push

```bash
git add .
git commit -m "Add complete order system with Clerk + Supabase"
git push origin main
```

### 5.3 Wait for Deployment

1. Vercel will **auto-deploy** (2-3 minutes)
2. **Watch** the deployment logs
3. **Look for** any errors
4. Deployment should show **"Ready"**

---

## 📋 STEP 6: TEST PRODUCTION (10 minutes)

### 6.1 Test Live Site

1. **Go to** https://truechem.io (your domain)
2. **Sign up** with a NEW email (don't use test account)
3. **Add** product to cart
4. **Checkout**
5. **Complete** order
6. **Verify** order confirmation shows

### 6.2 Verify in Supabase

1. **Go to** Supabase → Table Editor → orders
2. **You should see** the production order
3. **Different** from your local test order

### 6.3 Test Order History

1. **Go to** yoursite.com/account/orders
2. **Should see** your production order
3. **Click** on it to see details

---

## ✅ VERIFICATION CHECKLIST

Before considering deployment complete, verify:

### Authentication
- [ ] Can sign up for new account
- [ ] Can sign in with existing account
- [ ] Can sign in with Google
- [ ] Stay signed in after refresh
- [ ] Can sign out

### Shopping
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Cart persists (refresh page)
- [ ] Can update quantities
- [ ] Can remove items
- [ ] Cart total calculates correctly

### Checkout
- [ ] "Checkout" button visible when signed in
- [ ] "Sign In to Checkout" when not signed in
- [ ] Checkout page loads
- [ ] Can fill shipping form
- [ ] All fields work
- [ ] Can submit order

### Orders
- [ ] Order confirmation shows after checkout
- [ ] Correct order details displayed
- [ ] Order appears in Supabase database
- [ ] Order shows in /account/orders
- [ ] Can view order details

### No Errors
- [ ] No console errors
- [ ] No Vercel deployment errors
- [ ] No Supabase errors
- [ ] All pages load correctly

---

## 🚨 TROUBLESHOOTING

### "Clerk is not configured"

**Problem:** Missing Clerk keys
**Fix:**
1. Check `.env.local` has correct keys
2. Keys should start with `pk_test_` and `sk_test_`
3. Restart dev server: `npm run dev`

### "Failed to connect to Supabase"

**Problem:** Wrong Supabase keys
**Fix:**
1. Double-check Supabase URL (should end with `.supabase.co`)
2. Verify anon key is correct
3. Verify service_role key is different from anon key
4. Check no extra spaces in `.env.local`

### Build Errors in Vercel

**Problem:** Missing environment variables
**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Make sure ALL variables are added
3. No typos in variable names
4. Click "Redeploy" after adding variables

### Orders Not Saving

**Problem:** Database schema not created
**Fix:**
1. Go to Supabase → SQL Editor
2. Re-run `schema.sql`
3. Verify tables exist in Table Editor
4. Check service_role key is correct

### Checkout Page Shows 404

**Problem:** Files not deployed correctly
**Fix:**
1. Verify `app/checkout/page.tsx` exists in your project
2. Check git commit included all files
3. Push again: `git push origin main`
4. Check Vercel deployment logs

### "Sign In to Checkout" Not Working

**Problem:** Not redirecting to sign-in
**Fix:**
1. Check Clerk paths are configured correctly
2. Verify `/sign-in` and `/sign-up` routes work
3. Check browser console for errors

---

## 🎯 NEXT STEPS

### This Week
1. ✅ Test system thoroughly
2. ✅ Invite friends to test
3. ✅ Create test orders
4. 📧 Email PayRio about LegitScript status
5. 📧 Email Pearl for API docs

### Week 2-3 (While Waiting for PayRio)
- Perfect your product pages
- Add more products
- Test on different devices
- Get feedback from beta testers
- Maybe add more features

### Week 3-4 (When PayRio Ready)
- ✅ Get PayRio credentials
- ✅ Integrate payment processing (2-3 hours)
- ✅ Test payments thoroughly
- ✅ Integrate Pearl fulfillment (1-2 hours)
- 🚀 **LAUNCH!**

---

## 📊 WHAT'S WORKING NOW

After this deployment:

✅ **Complete E-Commerce Site**
- Product browsing
- Shopping cart
- User accounts
- Secure authentication

✅ **Order Management**
- Checkout flow
- Order creation
- Order storage
- Order history

✅ **Database Integration**
- All orders saved permanently
- Customer data secure
- Order tracking
- Status management

⏳ **Coming Soon**
- PayRio payment processing
- Pearl fulfillment
- Email notifications (Omnisend - optional)

---

## 🎉 CONGRATULATIONS!

You now have a **complete, production-ready e-commerce site!**

**What you built:**
- Full shopping experience
- User authentication  
- Order management
- Database integration
- Professional checkout flow

**Time invested:** ~60 minutes
**Value created:** Complete e-commerce infrastructure

**Next milestone:** Integrate PayRio when certified (2-4 weeks)

---

## 💡 TIPS FOR SUCCESS

### Development
- Always test locally before deploying
- Check browser console for errors
- Keep dev server running while coding
- Use Vercel preview deployments for testing

### Production
- Monitor Supabase for new orders
- Check Vercel logs if issues arise
- Test checkout flow regularly
- Keep environment variables secure

### Before Launch
- Test with real credit card (when PayRio ready)
- Process test order through Pearl
- Verify email notifications work
- Test on mobile devices
- Get legal review of terms/privacy

---

## 📞 NEED HELP?

**Check these first:**
1. This deployment guide
2. Browser console (F12)
3. Vercel deployment logs
4. Supabase logs

**Common fixes:**
- Restart dev server
- Clear browser cache
- Check environment variables
- Re-run database schema
- Redeploy in Vercel

**Still stuck?**
- Check Clerk documentation
- Check Supabase documentation
- Review this guide step-by-step

---

**You're ready to deploy! Let's go! 🚀**
