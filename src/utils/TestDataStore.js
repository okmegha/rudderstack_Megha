const { TIMEOUTS, CHARSETS, PATHS, RETRY } = require('./constants');

class TestDataStore {
    constructor() {
        this.dataPlaneUrl = '';
        this.writeKey = '';
        this.testStartTime = new Date();
        this.testData = new Map();
    }
    
    setDataPlaneUrl(url) {
        if (!url || typeof url !== 'string') {
            throw new Error('Data plane URL must be a non-empty string');
        }
        this.dataPlaneUrl = url.trim();
        console.log('✓ Data plane URL stored in TestDataStore');
    }
    
    getDataPlaneUrl() {
        if (!this.dataPlaneUrl) {
            throw new Error('Data plane URL not set. Call setDataPlaneUrl() first.');
        }
        return this.dataPlaneUrl;
    }
    
    setWriteKey(key) {
        if (!key || typeof key !== 'string') {
            throw new Error('Write key must be a non-empty string');
        }
        this.writeKey = key.trim();
        console.log('✓ Write key stored in TestDataStore');
    }
    
    getWriteKey() {
        if (!this.writeKey) {
            throw new Error('Write key not set. Call setWriteKey() first.');
        }
        return this.writeKey;
    }
    
    setTestData(key, value) {
        this.testData.set(key, value);
    }
    
    getTestData(key) {
        return this.testData.get(key);
    }
    
    clearAll() {
        this.dataPlaneUrl = '';
        this.writeKey = '';
        this.testData.clear();
        console.log('✓ TestDataStore cleared');
    }
    async waitForElement(element, timeout = TIMEOUTS.DEFAULT_WAIT, elementName = 'element') {
        try {
            await element.waitForDisplayed({ timeout });
        } catch (error) {
            await this.takeScreenshot(`wait-failed-${elementName}`);
            throw new Error(`Element '${elementName}' not displayed within ${timeout}ms: ${error.message}`);
        }
    }

    async waitForClickable(element, timeout = TIMEOUTS.DEFAULT_WAIT, elementName = 'element') {
        try {
            await element.waitForClickable({ timeout });
        } catch (error) {
            await this.takeScreenshot(`clickable-failed-${elementName}`);
            throw new Error(`Element '${elementName}' not clickable within ${timeout}ms: ${error.message}`);
        }
    }

    async takeScreenshot(name) {
        const fs = require('fs');
        const path = require('path');
        

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

    getTimestamp() {
        return new Date().toISOString();
    }

    getTestDuration() {
        return Math.floor((new Date() - this.testStartTime) / 1000);
    }

    generateRandomString(length = 8, charset = CHARSETS.ALPHANUMERIC) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    generateRandomEmail(domain = 'test.com') {
        const username = this.generateRandomString(10, CHARSETS.LOWERCASE + CHARSETS.NUMERIC);
        return `${username}@${domain}`;
    }

    async wait(milliseconds, reason = 'general pause') {
        console.log(`⏱️ Waiting ${milliseconds}ms for: ${reason}`);
        await browser.pause(milliseconds);
    }

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