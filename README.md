# Raya Store — Supabase + GitHub

This version turns the original Raya Store local-storage app into a cloud-synced website. The original interface is retained and extended so authenticated users can manage the same inventory/orders from different devices. The original file had Dashboard, Inventory, and Orders sections and previously saved data in browser `localStorage`; this version replaces that local persistence with Supabase.

## Files

- `index.html` — website/app
- `config.js` — Supabase project URL and public anon/publishable key
- `supabase.sql` — database tables, RLS policies, stock functions, and product-image storage setup

## 1. Create the Supabase project

1. Create a project at Supabase.
2. Open **SQL Editor**.
3. Paste the complete contents of `supabase.sql`.
4. Run it.
5. Open **Project Settings → API** and copy the project URL and the public **anon/publishable** key.

## 2. Configure `config.js`

Replace:

```js
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY";
```

with the values from your Supabase project.

**Never put the `service_role` or secret key in `config.js`.** The browser version must use only the public anon/publishable key.

## 3. Authentication

The website supports:

- Sign in
- Create account
- Forgot password
- Password reset
- Sign out

Supabase Authentication handles the accounts. If email confirmation is enabled, a new user may need to confirm the email before signing in.

For password recovery, Supabase must allow the URL of your deployed GitHub Pages site as a redirect URL.

In Supabase go to:

**Authentication → URL Configuration**

Add your GitHub Pages URL to the allowed redirect URLs, for example:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY/`

Also keep the local development URL you use for testing if needed.

## 4. GitHub Pages

1. Create a GitHub repository.
2. Upload:
   - `index.html`
   - `config.js`
   - `supabase.sql`
   - `README.md`
3. Commit the files.
4. Open **Settings → Pages**.
5. Select the branch containing the website and the root folder.
6. Save and wait for GitHub Pages to publish.

The website will then be accessible from computers and phones.

## 5. Inventory features

Click any item card in **Inventory** to open its editor.

From the item editor you can:

- Edit item name
- Edit price
- Change product picture
- Add stock
- Subtract/use stock
- View stock movement history
- Delete the product

When stock is added or used, a record is written to `inventory_transactions`.

When an order is recorded, the stock is automatically decreased and the stock movement is recorded.

The stock changes use database functions so the stock update and history/order operation happen atomically.

## 6. Product pictures

Pictures selected from the device are uploaded to the Supabase Storage bucket:

`product-images`

You can also paste an image URL.

The SQL creates the required Storage policies.

## 7. Important security note

The SQL enables Row Level Security and limits the application tables to authenticated users.

This means a person must sign in before the app can read or change inventory and orders.

All authenticated accounts currently have access to the store data. If only selected staff should be allowed to edit the store, add a staff/admin role system before deploying the site for production.

## 8. Existing data

The original HTML stored products and orders in browser `localStorage`. That data is not automatically moved into Supabase.

If you have existing Raya Store data that needs to be migrated, export/convert the old data before deleting the old version.
