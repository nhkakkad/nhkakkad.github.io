// ============================================================
// GOOGLE APPS SCRIPT — Psychiatrist Website Backend
// ============================================================
// SETUP INSTRUCTIONS:
//   1. Create a new Google Sheet (this will store appointments)
//   2. In the Sheet: Extensions → Apps Script → paste this code
//   3. Replace SPREADSHEET_ID and SECRET_TOKEN below
//   4. Click Deploy → New deployment
//        - Type: Web app
//        - Execute as: Me
//        - Who has access: Anyone
//   5. Authorise when prompted, then copy the Web App URL
//   6. Paste the URL as VITE_APPS_SCRIPT_URL in your .env file
//   7. Set the same SECRET_TOKEN as VITE_APPS_SCRIPT_TOKEN in .env
// ============================================================

const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';  // found in the sheet URL
const SECRET_TOKEN   = 'YOUR_SECRET_TOKEN_HERE';      // long random string — keep secret

const HEADERS = [
  'ID', 'Name', 'Email', 'Phone', 'Age', 'Gender',
  'Date', 'Time Slot', 'Reason', 'Visit Type',
  'Status', 'Doctor Notes', 'Submitted At',
];

function getSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Appointments');
  if (!sheet) {
    sheet = ss.insertSheet('Appointments');
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    // Style the header row
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setBackground('#0d9488')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
  }
  return sheet;
}

// Called when a patient submits the booking form
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet();
    const id = Utilities.getUuid();

    sheet.appendRow([
      id,
      data.name        || '',
      data.email       || '',
      data.phone       || '',
      data.age         || '',
      data.gender      || '',
      data.date        || '',
      data.timeSlot    || '',
      data.reason      || '',
      data.visitType   || '',
      'Pending',        // initial status
      '',               // doctor notes (blank)
      data.submittedAt || new Date().toISOString(),
    ]);

    return jsonResponse({ success: true, id });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// Called by the admin panel to read/update data
function doGet(e) {
  const { action, token, id, status, notes } = e.parameter;

  if (token !== SECRET_TOKEN) {
    return jsonResponse({ error: 'Unauthorized' });
  }

  const sheet = getSheet();

  // ── Get all appointments ──────────────────────────────────
  if (action === 'getAppointments') {
    const values = sheet.getDataRange().getValues();
    if (values.length <= 1) return jsonResponse({ appointments: [] });

    const headers = values[0];
    const appointments = values.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });
    return jsonResponse({ appointments });
  }

  // ── Update appointment status ─────────────────────────────
  if (action === 'updateStatus') {
    if (!id || !status) return jsonResponse({ error: 'Missing id or status' });
    return updateCell(sheet, id, 'Status', status);
  }

  // ── Update doctor's notes ─────────────────────────────────
  if (action === 'updateNotes') {
    if (!id) return jsonResponse({ error: 'Missing id' });
    return updateCell(sheet, id, 'Doctor Notes', notes || '');
  }

  return jsonResponse({ error: 'Unknown action' });
}

// Finds a row by ID and updates a single column
function updateCell(sheet, id, columnName, value) {
  const colIndex = HEADERS.indexOf(columnName);
  if (colIndex === -1) return jsonResponse({ error: 'Column not found' });

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      sheet.getRange(i + 1, colIndex + 1).setValue(value);
      return jsonResponse({ success: true });
    }
  }
  return jsonResponse({ error: 'Record not found' });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
