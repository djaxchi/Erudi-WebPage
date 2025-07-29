# Google Sheets Integration Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Erudi Waitlist"
4. In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Company`
   - E1: `Use Case`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Replace the default code with the code below
3. Save the project (name it "Erudi Waitlist Handler")

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Get data from form parameters
    const data = {
      timestamp: e.parameter.timestamp || new Date().toISOString(),
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      company: e.parameter.company || '',
      useCase: e.parameter.useCase || ''
    };
    
    // Prepare the row data
    const rowData = [
      data.timestamp,
      data.name,
      data.email,
      data.company,
      data.useCase
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (optional, for testing)
  return ContentService
    .createTextOutput("Erudi Waitlist API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Handle preflight OPTIONS requests
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Step 3: Deploy the Web App

1. In Apps Script, click the "Deploy" button (top right)
2. Choose "New deployment"
3. Select type: "Web app"
4. Configure:
   - Description: "Erudi Waitlist API"
   - Execute as: "Me"
   - Who has access: "Anyone"
5. Click "Deploy"
6. Copy the Web App URL that appears

## Step 4: Update the React Component

1. Open `/src/pages/WaitlistPage.tsx`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web App URL

## Step 5: Test the Integration

1. Go to your React app
2. Navigate to the waitlist page
3. Fill out and submit the form
4. Check your Google Sheet to see if the data appears

## Troubleshooting

- **CORS Issues**: Make sure the Apps Script is deployed with "Anyone" access
- **No data appearing**: Check the Apps Script execution logs
- **403 Errors**: Verify the deployment settings and URL

## Optional: Add Email Notifications

You can extend the Apps Script to send email notifications when someone joins:

```javascript
function sendNotification(data) {
  const subject = `New Erudi Waitlist Signup: ${data.name}`;
  const body = `
    New waitlist signup:
    
    Name: ${data.name}
    Email: ${data.email}
    Company: ${data.company || 'Not provided'}
    Use Case: ${data.useCase || 'Not provided'}
    Timestamp: ${data.timestamp}
  `;
  
  // Replace with your email
  MailApp.sendEmail('your-email@example.com', subject, body);
}

// Add this line to the doPost function after sheet.appendRow(rowData):
sendNotification(data);
```
