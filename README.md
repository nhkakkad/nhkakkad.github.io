# Dr. Nidhish Kakkad — Psychiatrist Website

Live site: **[https://nhkakkad.github.io/](https://nhkakkad.github.io/)**

A professional website for Dr. Nidhish Kakkad, Consultant Psychiatrist in Junagadh, Gujarat.

- **Public landing page** — intro, services, about, testimonials, practice hours
- **Appointment booking form** — stores data in Google Sheets via Apps Script
- **Password-protected admin panel** — view, manage & annotate all bookings at `/admin.html`

**Stack:** Pure HTML/CSS/JS · Google Apps Script · GitHub Pages (no build step)

---

## Updating Website Content

All editable content lives in **`content.js`** — you never need to touch `index.html`.

### How to update

1. Open `content.js` in any text editor (Notepad, TextEdit, VS Code, etc.)
2. Find the field you want to change and edit the value between the quotes
3. Save the file
4. Push to GitHub (see [Deploying changes](#deploying-changes) below)
5. The live site updates automatically within 1–2 minutes

---

## Fields in content.js

### Doctor Details

| Field | What it does |
|---|---|
| `name` | Doctor's full name (used in page title and nav) |
| `title` | Professional title shown under the name |
| `location` | City and state |
| `tagline` | Short tagline shown below the hero title |
| `heroDesc` | Paragraph of text in the hero section |
| `acceptingPatients` | `true` shows the "Accepting New Patients" badge; `false` hides it |

### Contact

| Field | What it does |
|---|---|
| `phone` | Display format of the phone number, e.g. `"+91 95126 79105"` |
| `phoneRaw` | Country code + number, no spaces or symbols, e.g. `"919512679105"` — used for tel: and WhatsApp links |
| `email` | Email address for the mailto: link |

### About

| Field | What it does |
|---|---|
| `aboutQuote` | The italic pull-quote in the About section (do not include quotation marks — they are added automatically) |
| `aboutBio` | The paragraph of body text in the About section |
| `languages` | Array of languages spoken — e.g. `["Gujarati", "Hindi", "English"]` |

### Stats

| Field | What it does |
|---|---|
| `statPatients` | Number shown on the "Patients Treated" stat card, e.g. `"500+"` |
| `statSatisfaction` | Number shown on the "Patient Satisfaction" stat card, e.g. `"98%"` |

### Practice Hours

The `hours` array contains one entry per day. Each entry has three fields:

| Field | What it does |
|---|---|
| `day` | Day name — must be one of: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday` |
| `time` | Time range shown in the table, e.g. `"10:00 AM – 6:00 PM"` |
| `status` | Controls the coloured dot: `"open"` (green) · `"limited"` (amber) · `"closed"` (grey) |

Today's row is automatically highlighted in green with a "Today" label.

Set `teleconsultationAvailable: true` to show the teleconsultation footer note, or `false` to hide it.

### Services

Each entry in the `services` array produces one flip card. Fields:

| Field | What it does |
|---|---|
| `icon` | Emoji shown on the card |
| `title` | Service name |
| `front` | Short description shown on the front of the card |
| `back` | Detailed description shown when the card is flipped |

### Testimonials

Each entry in the `testimonials` array produces one carousel card. Fields:

| Field | What it does |
|---|---|
| `stars` | Rating — use `5` for five stars or `4.5` for four-and-a-half |
| `quote` | The testimonial text (do not include quotation marks) |
| `detail` | Small label under "Anonymous", e.g. `"Long-term patient"` |
| `tele` | `true` appends `· Teleconsultation` to the detail label |
| `featured` | `true` makes the card dark/highlighted (use for one card only) |

### Footer

| Field | What it does |
|---|---|
| `footerTagline` | Short paragraph shown in the footer under the logo |

---

## Deploying Changes

After editing `content.js` (or any other file), push to GitHub:

```bash
git add content.js
git commit -m "Update content"
git push origin main
```

GitHub Actions will publish the updated site automatically. Changes are live within about 60 seconds.

---

## Admin Panel

- Go to **[https://nhkakkad.github.io/admin.html](https://nhkakkad.github.io/admin.html)** (or click **Admin** in the page footer).
- **First visit:** enter your Apps Script URL, secret token, and choose an admin password — these are saved to your browser's localStorage and never stored in the source code.
- **Subsequent visits:** enter your admin password to log in.
- View all appointment requests, filter by status, update statuses, and add clinical notes.

---

## Google Apps Script Setup

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

## Folder Structure

```
├── index.html              ← public-facing website
├── content.js              ← edit this to update all site content
├── admin.html              ← password-protected admin panel
├── apps-script.gs          ← paste into Google Apps Script
├── public/
│   └── favicon.svg
├── .github/workflows/
│   └── deploy.yml          ← auto-deploy to GitHub Pages (no build step)
└── src/                    ← legacy React files (unused, not deployed)
```
