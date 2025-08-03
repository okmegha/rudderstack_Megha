const { TIMEOUTS, CHARSETS, PATHS, RETRY } = require('./constants');

/**
 * Central data store for test data and utility functions
 * Manages test data persistence across test steps
 */
class TestDataStore {
    constructor() {
        this.dataPlaneUrl = '';
        this.writeKey = '';
        this.testStartTime = new Date();
        this.testData = new Map();
    }
    
    /**
     * Set the data plane URL
     * @param {string} url - Data plane URL
     */
    setDataPlaneUrl(url) {
        if (!url || typeof url !== 'string') {
            throw new Error('Data plane URL must be a non-empty string');
        }
        this.dataPlaneUrl = url.trim();
        console.log('✓ Data plane URL stored in TestDataStore');
    }
    
    /**
     * Get the data plane URL
     * @returns {string} Data plane URL
     */
    getDataPlaneUrl() {
        if (!this.dataPlaneUrl) {
            throw new Error('Data plane URL not set. Call setDataPlaneUrl() first.');
        }
        return this.dataPlaneUrl;
    }
    
    /**
     * Set the write key
     * @param {string} key - Write key
     */
    setWriteKey(key) {
        if (!key || typeof key !== 'string') {
            throw new Error('Write key must be a non-empty string');
        }
        this.writeKey = key.trim();
        console.log('✓ Write key stored in TestDataStore');
    }
    
    /**
     * Get the write key
     * @returns {string} Write key
     */
    getWriteKey() {
        if (!this.writeKey) {
            throw new Error('Write key not set. Call setWriteKey() first.');
        }
        return this.writeKey;
    }
    
    /**
     * Store arbitrary test data
     * @param {string} key - Data key
     * @param {any} value - Data value
     */
    setTestData(key, value) {
        this.testData.set(key, value);
    }
    
    /**
     * Retrieve test data
     * @param {string} key - Data key
     * @returns {any} Data value
     */
    getTestData(key) {
        return this.testData.get(key);
    }
    
    /**
     * Clear all stored data
     */
    clearAll() {
        this.dataPlaneUrl = '';
        this.writeKey = '';
        this.testData.clear();
        console.log('✓ TestDataStore cleared');
    }
    /**
     * Wait for element to be displayed with improved error handling
     * @param {WebdriverIO.Element} element - WebDriver element
     * @param {number} timeout - Timeout in milliseconds
     * @param {string} elementName - Name for logging purposes
     */
    async waitForElement(element, timeout = TIMEOUTS.DEFAULT_WAIT, elementName = 'element') {
        try {
            await element.waitForDisplayed({ timeout });
        } catch (error) {
            await this.takeScreenshot(`wait-failed-${elementName}`);
            throw new Error(`Element '${elementName}' not displayed within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Wait for element to be clickable
     * @param {WebdriverIO.Element} element - WebDriver element
     * @param {number} timeout - Timeout in milliseconds
     * @param {string} elementName - Name for logging purposes
     */
    async waitForClickable(element, timeout = TIMEOUTS.DEFAULT_WAIT, elementName = 'element') {
        try {
            await element.waitForClickable({ timeout });
        } catch (error) {
            await this.takeScreenshot(`clickable-failed-${elementName}`);
            throw new Error(`Element '${elementName}' not clickable within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Take screenshot with timestamp and create directory if needed
     * @param {string} name - Screenshot name
     * @returns {string} Screenshot file path
     */
    async takeScreenshot(name) {
        const fs = require('fs');
        const path = require('path');
        
        // Create screenshots directory if it doesn't exist
        const screenshotDir = PATHS.SCREENSHOTS;
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = path.join(screenshotDir, `${name}-${timestamp}.png`);
        
        try {
            await browser.saveScreenshot(filename);
            console.log(`📸 Screenshot saved: ${filename}`);
            return filename;
        } catch (error) {
            console.error(`Failed to save screenshot: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get current timestamp in ISO format
     * @returns {string} ISO timestamp
     */
    getTimestamp() {
        return new Date().toISOString();
    }

    /**
     * Get test duration since start
     * @returns {number} Duration in seconds
     */
    getTestDuration() {
        return Math.floor((new Date() - this.testStartTime) / 1000);
    }

    /**
     * Generate random string with customizable character set
     * @param {number} length - String length
     * @param {string} charset - Character set to use
     * @returns {string} Random string
     */
    generateRandomString(length = 8, charset = CHARSETS.ALPHANUMERIC) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    /**
     * Generate random email address
     * @param {string} domain - Email domain
     * @returns {string} Random email
     */
    generateRandomEmail(domain = 'test.com') {
        const username = this.generateRandomString(10, CHARSETS.LOWERCASE + CHARSETS.NUMERIC);
        return `${username}@${domain}`;
    }

    /**
     * Wait for specified time with logging
     * @param {number} milliseconds - Wait time in milliseconds
     * @param {string} reason - Reason for waiting (for logging)
     */
    async wait(milliseconds, reason = 'general pause') {
        console.log(`⏱️ Waiting ${milliseconds}ms for: ${reason}`);
        await browser.pause(milliseconds);
    }

    /**
     * Retry an action with exponential backoff
     * @param {Function} action - Action to retry
     * @param {number} maxRetries - Maximum retry attempts
     * @param {number} initialDelay - Initial delay in milliseconds
     * @returns {any} Action result
     */
    async retryAction(action, maxRetries = RETRY.MAX_ATTEMPTS, initialDelay = RETRY.INITIAL_DELAY) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await action();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    break;
                }
                
                const delay = Math.min(initialDelay * Math.pow(RETRY.BACKOFF_FACTOR, attempt - 1), RETRY.MAX_DELAY);
                console.log(`⚠️ Attempt ${attempt} failed, retrying in ${delay}ms: ${error.message}`);
                await this.wait(delay, `retry attempt ${attempt}`);
            }
        }
        
        throw lastError;
    }
}

module.exports = new TestDataStore();