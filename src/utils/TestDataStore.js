class TestDataStore {
    constructor() {
        this.dataPlaneUrl = '';
        this.writeKey = '';
      }
    
      setDataPlaneUrl(url) {
        this.dataPlaneUrl = url;
      }
    
      getDataPlaneUrl() {
        return this.dataPlaneUrl;
      }
    
      setWriteKey(key) {
        this.writeKey = key;
      }
    
      getWriteKey() {
        return this.writeKey;
      }
    /**
     * Wait for element to be displayed
     * @param {WebdriverIO.Element} element 
     * @param {number} timeout 
     */
    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Take screenshot with timestamp
     * @param {string} name 
     */
    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `./screenshots/${name}-${timestamp}.png`;
        await browser.saveScreenshot(filename);
        console.log(`Screenshot saved: ${filename}`);
    }

    /**
     * Get current timestamp
     * @returns {string}
     */
    getTimestamp() {
        return new Date().toISOString();
    }

    /**
     * Generate random string
     * @param {number} length 
     * @returns {string}
     */
    generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /**
     * Wait for specified time
     * @param {number} milliseconds 
     */
    async wait(milliseconds) {
        await browser.pause(milliseconds);
    }
}

module.exports = new TestDataStore();