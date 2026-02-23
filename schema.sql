-- truechem Order Management Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE orders (
  -- Primary ID
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Order identifiers
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer info (from Clerk)
  user_id TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT,
  
  -- Order status
  status TEXT NOT NULL DEFAULT 'pending',
  -- Status values: 
  --   'pending' = created, awaiting payment
  --   'paid' = payment received
  --   'processing' = sent to Pearl
  --   'shipped' = Pearl shipped order
  --   'delivered' = customer received
  --   'cancelled' = order cancelled
  --   'refunded' = payment refunded
  
  -- Financial details
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0.00,
  shipping_cost DECIMAL(10,2) DEFAULT 0.00,
  discount_amount DECIMAL(10,2) DEFAULT 0.00,
  discount_code TEXT,
  total DECIMAL(10,2) NOT NULL,
  
  -- Payment info (Payrio)
  payment_id TEXT,
  payment_status TEXT,
  payment_method TEXT,
  payment_processor TEXT DEFAULT 'payrio',
  
  -- Shipping address
  shipping_name TEXT NOT NULL,
  shipping_line1 TEXT NOT NULL,
  shipping_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'US',
  shipping_phone TEXT,
  
  -- Fulfillment (Pearl)
  pearl_order_id TEXT,
  pearl_status TEXT,
  tracking_number TEXT,
  tracking_carrier TEXT,
  tracking_url TEXT,
  
  -- Items (stored as JSONB array)
  items JSONB NOT NULL,
  -- Example: [{"id":"sem-5mg","name":"Semaglutide 5mg","price":199.99,"quantity":1}]
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  sent_to_pearl_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  -- Notes and metadata
  customer_notes TEXT,
  internal_notes TEXT,
  metadata JSONB,
  
  -- Soft delete
  deleted_at TIMESTAMPTZ
);

-- Indexes for fast queries
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(user_email);

-- =====================================================
-- ORDER EVENTS TABLE (Audit Trail)
-- =====================================================
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id),
  
  event_type TEXT NOT NULL,
  -- Event types: 'created', 'paid', 'shipped', 'delivered', 'cancelled', 'note_added', etc.
  
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT -- user_id or 'system'
);

CREATE INDEX idx_order_events_order_id ON order_events(order_id);
CREATE INDEX idx_order_events_created_at ON order_events(created_at DESC);

-- =====================================================
-- PRODUCTS TABLE (Optional - if you want to manage products in DB)
-- =====================================================
CREATE TABLE products (
  id TEXT PRIMARY KEY, -- e.g., 'sem-5mg'
  
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2), -- Your cost from supplier
  
  sku TEXT UNIQUE,
  pearl_sku TEXT, -- Pearl's SKU if different
  
  in_stock BOOLEAN DEFAULT true,
  inventory_count INTEGER,
  low_stock_threshold INTEGER DEFAULT 10,
  
  -- Product details
  size TEXT,
  purity TEXT,
  metadata JSONB,
  
  -- Status
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(active);

-- =====================================================
-- DISCOUNT CODES TABLE
-- =====================================================
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  
  discount_type TEXT NOT NULL, -- 'percentage' or 'fixed_amount'
  discount_value DECIMAL(10,2) NOT NULL,
  
  min_order_amount DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_discount_codes_code ON discount_codes(code);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TC-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to log order events automatically
CREATE OR REPLACE FUNCTION log_order_event()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO order_events (order_id, event_type, event_data, created_by)
    VALUES (NEW.id, 'created', row_to_json(NEW), 'system');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != NEW.status THEN
      INSERT INTO order_events (order_id, event_type, event_data, created_by)
      VALUES (
        NEW.id, 
        'status_changed', 
        jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status),
        'system'
      );
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-log events
CREATE TRIGGER order_events_trigger
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_event();

-- =====================================================
-- SAMPLE DATA (for testing)
-- =====================================================

-- Insert sample products
INSERT INTO products (id, name, category, price, cost, sku, in_stock) VALUES
  ('sem-5mg', 'Semaglutide 5mg', 'GLP-1 Agonists', 199.99, 65.00, 'SEM-5MG', false),
  ('tir-10mg', 'Tirzepatide 10mg', 'GLP-1 Agonists', 249.99, 80.00, 'TIR-10MG', false),
  ('bpc-5mg', 'BPC-157 5mg', 'Recovery Peptides', 89.99, 30.00, 'BPC-5MG', false),
  ('pen-3ml', 'Empty Pen Injector 3mL', 'Medical Supplies', 49.99, 12.00, 'PEN-3ML', false);

-- Insert sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_order_amount) VALUES
  ('WELCOME10', 'Welcome discount - 10% off', 'percentage', 10, 50),
  ('SAVE20', '$20 off orders over $200', 'fixed_amount', 20, 200);

-- =====================================================
-- ROW LEVEL SECURITY (Optional but recommended)
-- =====================================================

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (user_id = auth.uid()::text);

-- Policy: Service role can do anything (for your backend)
CREATE POLICY "Service role full access"
  ON orders FOR ALL
  USING (auth.role() = 'service_role');

-- Products are public (everyone can view)
CREATE POLICY "Products are public"
  ON products FOR SELECT
  USING (true);

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View: Recent orders
CREATE VIEW recent_orders AS
SELECT 
  id,
  order_number,
  user_email,
  status,
  total,
  created_at,
  shipped_at
FROM orders
WHERE deleted_at IS NULL
ORDER BY created_at DESC
LIMIT 100;

-- View: Orders awaiting fulfillment
CREATE VIEW orders_awaiting_fulfillment AS
SELECT 
  id,
  order_number,
  user_email,
  items,
  shipping_name,
  shipping_line1,
  shipping_city,
  shipping_state,
  shipping_zip,
  created_at
FROM orders
WHERE status = 'paid' 
  AND pearl_order_id IS NULL
  AND deleted_at IS NULL
ORDER BY created_at ASC;

-- =====================================================
-- COMPLETED!
-- =====================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'truechem order system database schema created successfully!';
  RAISE NOTICE 'Tables created: orders, order_events, products, discount_codes';
  RAISE NOTICE 'Views created: recent_orders, orders_awaiting_fulfillment';
END $$;
