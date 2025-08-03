// utils/apiUtils.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const TestDataStore = require('./TestDataStore');
const { API, TIMEOUTS, ERRORS } = require('./constants');
const { getCurrentTimestamp } = require('./timestamp');

/**
 * Validates required data before making API calls
 * @throws {Error} If validation fails
 */
function validateApiData() {
  const writeKey = TestDataStore.getWriteKey();
  const dataPlaneUrl = TestDataStore.getDataPlaneUrl();
  
  if (!writeKey) {
    throw new Error('Write key is required but not set in TestDataStore');
  }
  
  if (!dataPlaneUrl) {
    throw new Error('Data plane URL is required but not set in TestDataStore');
  }
  
  return { writeKey, dataPlaneUrl };
}

/**
 * Creates axios configuration with authentication
 * @param {string} writeKey - The write key for authentication
 * @returns {Object} Axios configuration object
 */
function createApiConfig(writeKey) {
  return {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${writeKey}:`).toString('base64')}`,
      'Content-Type': API.HEADERS.CONTENT_TYPE,
      'User-Agent': API.HEADERS.USER_AGENT
    },
    timeout: TIMEOUTS.API_REQUEST
  };
}

/**
 * Loads and validates JSON payload from file
 * @param {string} payloadPath - Path to the JSON payload file
 * @returns {Object} Parsed JSON payload
 */
function loadPayload(payloadPath) {
  const fullPath = path.resolve(payloadPath);
  
  console.log(`🔍 Looking for payload file at: ${fullPath}`);
  
  if (!fs.existsSync(fullPath)) {
    // Try relative to project root as fallback
    const projectRootPath = path.resolve(process.cwd(), payloadPath);
    console.log(`🔍 Trying fallback path: ${projectRootPath}`);
    
    if (!fs.existsSync(projectRootPath)) {
      throw new Error(`Payload file not found at either:\n- ${fullPath}\n- ${projectRootPath}`);
    }
    
    return loadPayloadFromPath(projectRootPath);
  }
  
  return loadPayloadFromPath(fullPath);
}

/**
 * Load and parse payload from a specific file path
 * @param {string} filePath - Full file path
 * @returns {Object} Parsed JSON payload
 */
function loadPayloadFromPath(filePath) {
  try {
    console.log(`📄 Loading payload from: ${filePath}`);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Replace timestamp placeholder with current timestamp
    const currentTimestamp = getCurrentTimestamp();
    fileContent = fileContent.replace(/\{\{CURRENT_TIMESTAMP\}\}/g, currentTimestamp);
    
    const payload = JSON.parse(fileContent);
    
    // Add current timestamp if not provided
    if (!payload.timestamp) {
      payload.timestamp = currentTimestamp;
      console.log(`⏱️ Added timestamp: ${payload.timestamp}`);
    } else {
      console.log(`⏱️ Using timestamp: ${payload.timestamp}`);
    }
    
    return payload;
  } catch (error) {
    throw new Error(`Failed to parse payload file ${filePath}: ${error.message}`);
  }
}

/**
 * Sends an identify event to RudderStack
 * @param {string} payloadPath - Path to the JSON payload file
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} API response
 */
async function sendIdentifyEvent(payloadPath, options = {}) {
  try {
    const { writeKey, dataPlaneUrl } = validateApiData();
    const payload = loadPayload(payloadPath);
    const url = `${dataPlaneUrl}${API.ENDPOINTS.IDENTIFY}`;
    
    console.log(`Sending identify event to: ${url}`);
    console.log(`Using write key: ${writeKey.substring(0, 8)}...`);
    
    const config = {
      ...createApiConfig(writeKey),
      ...options
    };
    
    const response = await axios.post(url, payload, config);
    
    console.log(`✓ Event sent successfully - Status: ${response.status}`);
    if (response.data) {
      console.log('Response data:', response.data);
    }
    
    return response;
  } catch (error) {
    const errorMsg = error.response 
      ? `API Error ${error.response.status}: ${JSON.stringify(error.response.data)}`
      : `Network Error: ${error.message}`;
    
    console.error('✗ Failed to send identify event:', errorMsg);
    throw new Error(`Failed to send identify event: ${errorMsg}`);
  }
}

module.exports = { sendIdentifyEvent };
