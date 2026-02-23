# ⚡ QUICK START - Deploy in 30 Minutes

**Fast track deployment guide**

---

## Prerequisites

- [ ] Vercel account
- [ ] GitHub account
- [ ] Email address

---

## Step 1: Create Accounts (10 min)

### Clerk (Authentication)
1. Go to https://clerk.com
2. Sign up → Create application "truechem"
3. Copy both API keys

### Supabase (Database)
1. Go to https://supabase.com
2. Create new project
3. Copy 3 keys: URL, anon, service_role

---

## Step 2: Setup Database (5 min)

1. Supabase → SQL Editor
2. Paste contents of `schema.sql`
3. Click "RUN"
4. Verify 4 tables created

---

## Step 3: Configure (5 min)

### Local (.env.local)
```bash
cp .env.local.example .env.local
```

Add your keys to `.env.local`

### Vercel
Settings → Environment Variables → Add all keys

---

## Step 4: Test (5 min)

```bash
npm install
npm run dev
```

1. Sign up
2. Add to cart
3. Checkout
4. Verify order in Supabase

---

## Step 5: Deploy (5 min)

```bash
git add .
git commit -m "Complete deployment"
git push origin main
```

Vercel auto-deploys!

---

## ✅ Done!

**Working features:**
- ✅ Shopping cart
- ✅ User accounts
- ✅ Checkout
- ✅ Order history

**Coming soon:**
- PayRio payments
- Pearl fulfillment

---

**Need detailed instructions?**  
See `DEPLOYMENT_GUIDE.md`
