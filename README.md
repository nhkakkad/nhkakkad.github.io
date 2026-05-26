# Dr. Nidhish Kakkad — Psychiatrist Website

Live site: **[https://nhkakkad.github.io/](https://nhkakkad.github.io/)**

Online teleconsultation practice — patients worldwide, sessions over video.

- **Public landing page** — intro, services, about, testimonials, practice hours
- **Appointment booking form** — stores data in Google Sheets via Apps Script; sends confirmation emails to doctor and patient automatically
- **Admin panel** — view, manage & annotate all bookings at `/admin.html`

**Stack:** Pure HTML/CSS/JS · Google Apps Script · GitHub Pages (no build step)

---

## Updating Website Content

All editable content lives in **`content.js`** — you never need to touch `index.html`.

1. Open `content.js` in any text editor
2. Edit the value you want to change
3. Save the file, then push to GitHub (see [Deploying Changes](#deploying-changes))
4. The live site updates within about 60 seconds

---

## Fields in content.js

### Doctor Details

| Field | What it does |
|---|---|
| `name` | Doctor's full name |
| `title` | Professional title |
| `tagline` | Short tagline below the hero title |
| `heroDesc` | Paragraph in the hero section |
| `acceptingPatients` | `true` shows the "Accepting New Patients" badge; `false` hides it |

### Contact

| Field | What it does |
|---|---|
| `phone` | Display format, e.g. `"+91 95126 79105"` |
| `phoneRaw` | Country code + number, no spaces, e.g. `"919512679105"` — used for call/WhatsApp links |
| `email` | Email address |

### About

| Field | What it does |
|---|---|
| `aboutQuote` | Pull-quote in the About section (no quotation marks needed) |
| `aboutBio` | Body paragraph in the About section |
| `languages` | Array of languages spoken |

### Stats

| Field | What it does |
|---|---|
| `statPatients` | Number on the "Patients Treated" card, e.g. `"2500+"` |
| `statSatisfaction` | Number on the "Patient Satisfaction" card, e.g. `"98%"` |

### Practice Hours

The `hours` array has one entry per day with three fields:

| Field | What it does |
|---|---|
| `day` | Day name — `Monday` through `Sunday` |
| `time` | Time range shown, e.g. `"10:00 AM – 8:00 PM (IST)"` |
| `status` | Dot colour: `"open"` (green) · `"limited"` (amber) · `"closed"` (grey) |

Today's row is automatically highlighted.

### Services

Each entry in `services` produces one flip card:

| Field | What it does |
|---|---|
| `icon` | Emoji on the card |
| `title` | Service name |
| `front` | Short description on the card front |
| `back` | Detail shown when the card is flipped |

### Testimonials

Each entry in `testimonials` produces one carousel card:

| Field | What it does |
|---|---|
| `stars` | `5` or `4.5` |
| `quote` | Testimonial text (no quotation marks needed) |
| `detail` | Label under "Anonymous", e.g. `"Long-term patient"` |
| `tele` | `true` appends `· Teleconsultation` to the label |
| `featured` | `true` makes the card dark/highlighted (use for one card only) |

### Footer

| Field | What it does |
|---|---|
| `footerTagline` | Short line shown in the footer under the logo |

---

## Deploying Changes

```bash
git add content.js
git commit -m "Update content"
git push origin main
```

GitHub Pages publishes automatically. Changes are live within ~60 seconds.

---

## Admin Panel

Go to **[https://nhkakkad.github.io/admin.html](https://nhkakkad.github.io/admin.html)**

**First visit:** you will be prompted to enter your Apps Script Web App URL and secret token — these are saved in your browser's localStorage.

**Login credentials:**
- Username: `nhkakkad`
- Password: *(set separately — keep private)*

From the dashboard you can filter appointments by status, update statuses, and add clinical notes.

---

## Google Apps Script Setup

1. Create a new **Google Sheet**.

2. Open **Extensions → Apps Script**, delete the starter code, and paste the contents of [`apps-script.gs`](./apps-script.gs).

3. Edit the constants at the top:
   ```js
   const SPREADSHEET_ID = 'paste-your-sheet-id-here';
   const SECRET_TOKEN   = 'make-up-a-long-random-string';
   const DOCTOR_EMAIL   = 'kakkadnidhish@gmail.com';
   ```

4. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the Web App URL.

5. When prompted by Google, **authorise** the script — it needs permission to send emails via Gmail and write to Sheets.

6. In `index.html`, paste the Web App URL into the `APPS_SCRIPT_URL` constant near the top of the `<script>` block.

7. Visit `/admin.html` and enter the Web App URL and your secret token to complete setup.

> **Re-deploying:** any time you edit the Apps Script code, create a **new version** under Deploy → Manage deployments, otherwise the old code continues to run.

---

## How Emails Work

When a patient submits the booking form:
- **Doctor** receives an email with all appointment details.
- **Patient** receives a confirmation that their *request* has been received (not confirmed), with their chosen date/time and a note that the doctor will follow up within 24 hours.

Emails are sent by Google Apps Script using the doctor's Gmail account — no third-party service needed.

---

## Folder Structure

```
├── index.html          ← public-facing website
├── content.js          ← edit this to update all site content
├── admin.html          ← admin panel (login-protected)
├── apps-script.gs      ← paste into Google Apps Script
└── public/
    └── favicon.svg
```
