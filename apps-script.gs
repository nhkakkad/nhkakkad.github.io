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

const SPREADSHEET_ID = '106EqzFsF_ixRnE3hhuZ2254vJAIQXzQurwMUP43lij4';  // found in the sheet URL
const SECRET_TOKEN   = 'ParthIsGreat05!';      // long random string — keep secret
const DOCTOR_EMAIL   = 'nhk5596@gmail.com';     // where new booking alerts go

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

    const fullName = ((data.fname || '') + ' ' + (data.lname || '')).trim() || data.name || '';

    sheet.appendRow([
      id,
      fullName,
      data.email       || '',
      data.phone       || '',
      data.age         || '',
      data.gender      || '',
      data.date        || '',
      data.timeSlot    || '',
      data.reason      || '',
      data.visitType   || '',
      'Pending',
      '',
      data.submittedAt || new Date().toISOString(),
    ]);

    sendEmails(id, fullName, data);

    return jsonResponse({ success: true, id });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function sendEmails(id, fullName, data) {
  try {
    // ── Email to doctor ───────────────────────────────────────
    MailApp.sendEmail({
      to: DOCTOR_EMAIL,
      subject: 'New Appointment Request — ' + fullName,
      htmlBody:
        '<div style="font-family:sans-serif;max-width:560px;margin:0 auto">' +
        '<div style="background:#1f1635;padding:24px 32px;border-radius:12px 12px 0 0">' +
        '<h2 style="color:#ffffff;margin:0;font-size:20px">New Appointment Request</h2>' +
        '</div>' +
        '<div style="background:#f9f7f2;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e0d8">' +
        row('Patient', fullName) +
        row('Phone', data.phone || '—') +
        row('Email', data.email || '—') +
        row('Date', data.date || '—') +
        row('Time', data.timeSlot || '—') +
        row('Reason', data.reason || '—') +
        (data.notes ? row('Notes', data.notes) : '') +
        '<p style="margin-top:24px;font-size:13px;color:#888">Booking ID: ' + id + '</p>' +
        '</div>' +
        '</div>',
    });

    // ── Confirmation email to patient ─────────────────────────
    if (data.email) {
      MailApp.sendEmail({
        to: data.email,
        subject: 'Appointment Request Received — Dr. Nidhish Kakkad',
        htmlBody:
          '<div style="font-family:sans-serif;max-width:560px;margin:0 auto">' +
          '<div style="background:#1f1635;padding:24px 32px;border-radius:12px 12px 0 0">' +
          '<h2 style="color:#ffffff;margin:0;font-size:20px">Your Request Has Been Received</h2>' +
          '</div>' +
          '<div style="background:#f9f7f2;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e0d8">' +
          '<p style="color:#333;margin-bottom:20px">Dear ' + (data.fname || fullName) + ',</p>' +
          '<p style="color:#333;margin-bottom:20px">Thank you for reaching out. Your appointment request has been received and Dr. Nidhish Kakkad will confirm your slot within 24 hours.</p>' +
          '<h3 style="color:#1f1635;font-size:15px;margin-bottom:12px">Requested Slot</h3>' +
          row('Date', data.date || '—') +
          row('Time', data.timeSlot || '—') +
          row('Reason', data.reason || '—') +
          '<p style="margin-top:20px;color:#888;font-size:13px;font-style:italic">This is not a confirmed appointment. You will receive a separate confirmation once the slot is approved.</p>' +
          '<p style="margin-top:16px;color:#333">For urgent queries, WhatsApp or call <strong>+91 95126 79105</strong>.</p>' +
          '<p style="margin-top:24px;font-size:13px;color:#888">Booking ID: ' + id + '</p>' +
          '</div>' +
          '</div>',
      });
    }
  } catch (mailErr) {
    // Don't fail the booking if email sending fails — log silently
    console.error('Email send error:', mailErr.message);
  }
}

function row(label, value) {
  return '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #e5e0d8">' +
    '<span style="color:#888;font-size:13px;min-width:80px">' + label + '</span>' +
    '<span style="color:#1a1530;font-size:13px;font-weight:500">' + value + '</span>' +
    '</div>';
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
