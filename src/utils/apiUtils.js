// utils/apiUtils.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const TestDataStore = require('./TestDataStore'); // This should have getWriteKey() & getDataPlaneUrl()

async function sendIdentifyEvent(payloadPath) {
  const writeKey = TestDataStore.getWriteKey(); // Assumes this returns the writeKey string
  const dataPlaneUrl = TestDataStore.getDataPlaneUrl(); // Assumes this returns the URL string

  const url = `${dataPlaneUrl}/v1/identify`;

  // Encode writeKey for Basic Auth
  const auth = Buffer.from(`${writeKey}:`).toString('base64');

  // Load JSON payload from file
  const payload = JSON.parse(fs.readFileSync(path.resolve(payloadPath), 'utf8'));

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Event sent successfully:', response.status);
  } catch (error) {
    console.error('Failed to send event:', error.response?.data || error.message);
  }
}

module.exports = { sendIdentifyEvent };
