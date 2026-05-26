# Dr. [Doctor Name] — Psychiatrist Website

A professional website for a psychiatrist practice with:
- **Public landing page** — intro, services, about
- **Appointment booking form** — stores data in Google Sheets
- **Password-protected admin panel** — view, manage & annotate all bookings

**Stack:** React + Vite · Tailwind CSS · Google Apps Script · GitHub Pages

---

## Quick Start (local dev)

```bash
npm install
cp .env.example .env   # fill in your values
npm run dev
```

---

## Setup Guide

### 1. Personalise the content

Search for `[` in the `src/` folder to find all placeholder text:

| Placeholder | Replace with |
|---|---|
| `[Doctor Name]` | Full name, e.g. `Dr. Nidhish Sharma` |
| `[Hospital / Clinic Name]` | Clinic name |
| `[City]` | City, e.g. `Mumbai` |
| `[Clinic Address, City]` | Full address |
| `[Phone Number]` | Contact number |
| `[Email Address]` | Contact email |
| `[MCI/State Council Number]` | Medical registration number |
| `[Year]` (in About) | Graduation years |

---

### 2. Set up Google Sheets + Apps Script

1. Create a new **Google Sheet** — note its ID from the URL:
   `https://docs.google.com/spreadsheets/d/**SPREADSHEET_ID**/edit`

2. In the sheet: **Extensions → Apps Script**

3. Delete any starter code and paste the contents of [`apps-script.gs`](./apps-script.gs)

4. Edit the two constants at the top:
   ```js
   const SPREADSHEET_ID = 'paste-your-sheet-id';
   const SECRET_TOKEN   = 'make-up-a-long-random-string';
   ```

5. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the Web App URL

---

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in:

```env
VITE_BASE_URL=/your-repo-name/        # e.g. /nidhish-website/
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
VITE_APPS_SCRIPT_TOKEN=your-secret-token  # same as in Apps Script
VITE_ADMIN_PASSWORD=ChooseAStrongPassword
```

> **Never commit `.env`** — it's in `.gitignore`.

---

### 4. Create the GitHub repo & push

```bash
cd "Nidhish Website"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

### 5. Add GitHub repository secrets

In your repo: **Settings → Secrets and variables → Actions → New repository secret**

Add these four secrets (same values as your `.env`):

| Secret name | Value |
|---|---|
| `VITE_APPS_SCRIPT_URL` | Your Apps Script Web App URL |
| `VITE_APPS_SCRIPT_TOKEN` | Your secret token |
| `VITE_ADMIN_PASSWORD` | Admin panel password |

> `VITE_BASE_URL` is set automatically from the repo name in the workflow.

---

### 6. Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** · Folder: **/ (root)**
4. Save

The site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

Every push to `main` triggers an automatic redeploy via GitHub Actions.

---

## Admin Panel

- Navigate to `/#/admin` on the live site (or click **Admin** in the footer)
- Log in with `VITE_ADMIN_PASSWORD`
- View all appointment requests, filter by status, update statuses, add clinical notes
- Click any row for full patient details

---

## Folder Structure

```
├── apps-script.gs          ← paste into Google Apps Script
├── src/
│   ├── pages/
│   │   ├── Home.jsx        ← landing page
│   │   ├── About.jsx       ← doctor profile
│   │   ├── BookAppointment.jsx
│   │   └── Admin.jsx       ← password-protected dashboard
│   └── components/
│       ├── Navbar.jsx
│       └── Footer.jsx
├── .github/workflows/
│   └── deploy.yml          ← auto-deploy to GitHub Pages
└── .env.example
```
