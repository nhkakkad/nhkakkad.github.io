# Dr. Nidhish Kakkad — Psychiatrist Website

Live site: **[https://nhkakkad.github.io/](https://nhkakkad.github.io/)**

A professional website for Dr. Nidhish Kakkad, Consultant Psychiatrist in Junagadh, Gujarat.

- **Public landing page** — intro, services, about, testimonials
- **Appointment booking form** — stores data in Google Sheets via Apps Script
- **Password-protected admin panel** — view, manage & annotate all bookings at `/admin.html`

**Stack:** Pure HTML/CSS/JS · Google Apps Script · GitHub Pages (no build step)

---

## Setup Guide

### 1. Fill in real contact details

Open `index.html` and search for `[placeholder]` to find every field that needs updating:

| What to search | Replace with |
|---|---|
| `[Phone Number]` | e.g. `+91 98765 43210` |
| `[Email Address]` | e.g. `dr.nidhish@example.com` |
| `[Clinic Address]` | Full clinic address |
| `91XXXXXXXXXX` (WhatsApp link) | 12-digit number: `919876543210` |

---

### 2. Set up Google Sheets + Apps Script

1. Create a new **Google Sheet**.

2. Open **Extensions → Apps Script**, delete the starter code, and paste the contents of [`apps-script.gs`](./apps-script.gs).

3. Edit the two constants at the top of the script:
   ```js
   const SPREADSHEET_ID = 'paste-your-sheet-id-here';
   const SECRET_TOKEN   = 'make-up-a-long-random-string';
   ```

4. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the Web App URL.

5. In `index.html`, replace the placeholder near the top of the `<script>` block:
   ```js
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

---

### 3. Create the GitHub repo & push

The repo must be named **`nhkakkad.github.io`** for the site to appear at the root URL.

```bash
git remote add origin https://github.com/nhkakkad/nhkakkad.github.io.git
git push -u origin main
```

---

### 4. Enable GitHub Pages

1. Go to the repo **Settings → Pages**.
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** · Folder: **/ (root)**
4. Save.

GitHub Actions will automatically deploy on every push to `main`. The workflow publishes only `index.html`, `admin.html`, `favicon.svg`, and related assets — no source code.

---

## Admin Panel

- Go to **[https://nhkakkad.github.io/admin.html](https://nhkakkad.github.io/admin.html)** (or click **Admin** in the page footer).
- **First visit:** enter your Apps Script URL, secret token, and choose an admin password — these are saved to your browser's localStorage and never stored in the source code.
- **Subsequent visits:** enter your admin password to log in.
- View all appointment requests, filter by status, update statuses, and add clinical notes.

---

## Folder Structure

```
├── index.html              ← public-facing website
├── admin.html              ← password-protected admin panel
├── apps-script.gs          ← paste into Google Apps Script
├── public/
│   └── favicon.svg
├── .github/workflows/
│   └── deploy.yml          ← auto-deploy to GitHub Pages (no build step)
└── src/                    ← legacy React files (unused, not deployed)
```
