# Complete Google Apps Script Setup Guide

## 🚨 **Current Issue**: CORS + 401 Unauthorized

The current Google Apps Script deployment has permission issues. Follow this step-by-step guide to fix it.

## 📋 **Step 1: Delete and Recreate the Apps Script**

1. Go to your Google Apps Script project
2. Delete the current deployment (if any)
3. Start fresh with the code below

## 📋 **Step 2: Complete Apps Script Code**

Replace ALL the code in your Apps Script with this:

```javascript
function doPost(e) {
  try {
    // Log incoming request for debugging
    console.log('Received POST request:', e);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Get data from form parameters (FormData approach)
    const data = {
      timestamp: e.parameter.timestamp || new Date().toISOString(),
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      company: e.parameter.company || '',
      useCase: e.parameter.useCase || ''
    };
    
    // Log the parsed data
    console.log('Parsed data:', data);
    
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
    console.log('Data appended to sheet successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        data: data 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to save data'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Erudi Waitlist API is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify sheet access
function testSheetAccess() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const testData = ['Test', 'test@example.com', 'Test Company', 'Testing', new Date().toISOString()];
    sheet.appendRow(testData);
    console.log('Test data added successfully');
    return 'Sheet access working';
  } catch (error) {
    console.error('Sheet access error:', error);
    return 'Sheet access failed: ' + error.toString();
  }
}
```

## 📋 **Step 3: Critical Deployment Steps**

1. **Save the project** with a clear name like "Erudi Waitlist Handler"

2. **Test the script first**:
   - Click "Run" on the `testSheetAccess` function
   - Grant all necessary permissions
   - Check if a test row appears in your sheet

3. **Deploy as Web App**:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - **CRITICAL SETTINGS**:
     - Description: "Erudi Waitlist API"
     - Execute as: **"Me (your-email@gmail.com)"**
     - Who has access: **"Anyone"** ⚠️ This is crucial for CORS!

4. **Copy the new Web App URL**
   - It should look like: `https://script.google.com/macros/s/[NEW_ID]/exec`

## 📋 **Step 4: Update Your React App**

Replace the URL in your React component with the new one:

```typescript
// In WaitlistPage.tsx, replace the GOOGLE_SCRIPT_URL with your new deployment URL
const GOOGLE_SCRIPT_URL = 'YOUR_NEW_DEPLOYMENT_URL_HERE';

// Then uncomment the actual fetch code and comment out the mock code
```

## 📋 **Step 5: Test the Connection**

1. **Test in browser first**:
   - Open your new Web App URL directly in browser
   - You should see: `{"status":"Erudi Waitlist API is running","timestamp":"..."}`

2. **Test with form**:
   - Submit the form from your React app
   - Check the Google Apps Script logs (View > Logs)
   - Verify data appears in your Google Sheet

## 🔧 **Troubleshooting Common Issues**

### **Still getting CORS errors?**
- Make sure deployment access is set to "Anyone"
- Try redeploying the script
- Clear browser cache

### **401 Unauthorized?**
- The script wasn't deployed with public access
- Redeploy with "Who has access: Anyone"

### **No data in sheet?**
- Check Apps Script execution logs
- Run the `testSheetAccess` function manually
- Verify sheet permissions

### **403 Forbidden?**
- Grant all permissions when prompted
- Make sure you're the owner of both the sheet and script

## 🎯 **Alternative: Use a Form Service**

If Google Apps Script continues to cause issues, consider these alternatives:

1. **Formspree** (formspree.io) - Simple, reliable
2. **Netlify Forms** - If you deploy on Netlify
3. **Google Forms** - Create a form and embed it
4. **Airtable** - Has better API support

Would you like me to set up any of these alternatives instead?
