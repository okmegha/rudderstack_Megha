Framework API Documentation

Page Objects

Base Page Object Pattern

```javascript
class BasePage {
    constructor() {
        this.url = '';
    }

    async open(path = '') {
        await browser.url(this.url + path);
    }

    async waitForPageLoad() {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 10000, timeoutMsg: 'Page did not load within 10 seconds' }
        );
    }
}
```

Selectors Best Practices

```javascript
class LoginPage extends BasePage {
    get usernameInput() { return $('[data-testid="username"]'); }
    get passwordInput() { return $('[data-testid="password"]'); }
    get loginButton() { return $('[data-testid="login-btn"]'); }
    
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}
```

Step Definitions

Basic Pattern

```javascript
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given('I am on the {string} page', async (pageName) => {
    const page = PageFactory.getPage(pageName);
    await page.open();
});

When('I enter {string} in the {string} field', async (value, fieldName) => {
    const element = await $(ElementLocator.get(fieldName));
    await element.setValue(value);
});

Then('I should see {string}', async (expectedText) => {
    const element = await $(`*=${expectedText}`);
    await expect(element).toBeDisplayed();
});
```

Parameter Handling

```javascript
Then('the title should contain {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    await expect(title).toContain(expectedTitle);
});

When('I wait for {int} seconds', async (seconds) => {
    await browser.pause(seconds * 1000);
});

When('I fill the form with:', async (dataTable) => {
    const rows = dataTable.hashes();
    for (const row of rows) {
        const element = await $(ElementLocator.get(row.field));
        await element.setValue(row.value);
    }
});
```

Utility Functions

Wait Helpers

```javascript
class WaitHelpers {
    static async waitForElement(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async waitForText(selector, text, timeout = 10000) {
        await browser.waitUntil(async () => {
            const element = await $(selector);
            const elementText = await element.getText();
            return elementText.includes(text);
        }, { timeout, timeoutMsg: `Text "${text}" not found in element ${selector}` });
    }

    static async waitForPageLoad(timeout = 30000) {
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout }
        );
    }

    static async waitForApiResponse(url, timeout = 30000) {
        await browser.waitUntil(async () => {
            const networkLogs = await browser.getLogs('browser');
            return networkLogs.some(log => 
                log.message.includes(url) && 
                log.message.includes('200')
            );
        }, { timeout });
    }
}
```

Screenshot Helpers

```javascript
class ScreenshotHelpers {
    static async takeFullPageScreenshot(filename) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fullFilename = `${filename}-${timestamp}.png`;
        await browser.saveScreenshot(`./screenshots/${fullFilename}`);
        return fullFilename;
    }

    static async takeElementScreenshot(selector, filename) {
        const element = await $(selector);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fullFilename = `${filename}-element-${timestamp}.png`;
        await element.saveScreenshot(`./screenshots/${fullFilename}`);
        return fullFilename;
    }

    static async compareScreenshot(filename, threshold = 0.2) {
        return await browser.checkFullPageScreen(filename, { threshold });
    }
}
```

Data Helpers

```javascript
class DataHelpers {
    static generateRandomEmail(domain = 'test.com') {
        const randomString = Math.random().toString(36).substring(7);
        return `test-${randomString}@${domain}`;
    }

    static generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static formatTimestamp(date = new Date()) {
        return date.toISOString().replace(/[:.]/g, '-');
    }

    static loadTestData(filename) {
        const fs = require('fs');
        const path = require('path');
        const dataPath = path.join(process.cwd(), 'data', filename);
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
}
```

Environment Configuration

Using Environment Config

```javascript
const envConfig = require('../config/environments');

class TestSetup {
    static async initialize() {
        const config = envConfig.getCurrentConfig();
        console.log(`Running tests in: ${config.environment}`);
        console.log(`Base URL: ${config.baseUrl}`);
        
        await browser.url(config.baseUrl);
    }

    static getCredentials() {
        return envConfig.getCredentials();
    }

    static getApiEndpoint(endpoint) {
        return `${envConfig.getApiUrl()}${endpoint}`;
    }
}
```

Environment-Specific Logic

```javascript
class EnvironmentUtils {
    static isProduction() {
        return envConfig.getCurrentEnvironment() === 'prod';
    }

    static isDevelopment() {
        return envConfig.getCurrentEnvironment() === 'dev';
    }

    static shouldSkipTest() {
        return this.isProduction() && process.env.SKIP_PROD_TESTS === 'true';
    }
}
```

Assertions

WebdriverIO Expect

```javascript
const expect = require('expect-webdriverio');

describe('Assertion Examples', () => {
    it('should demonstrate various assertions', async () => {
        await expect($('#username')).toBeDisplayed();
        await expect($('#username')).toHaveText('Expected Text');
        await expect($('#username')).toHaveAttribute('placeholder', 'Enter username');
        await expect($$('.list-item')).toBeElementsArrayOfSize(5);
        await expect(browser).toHaveTitle('Expected Title');
        await expect(browser).toHaveUrl('https://example.com');
    });
});
```

Custom Matchers

```javascript
class CustomMatchers {
    static async toContainVisibleText(element, expectedText) {
        await element.waitForDisplayed();
        const text = await element.getText();
        return text.includes(expectedText);
    }

    static async toBeWithinViewport(element) {
        await element.waitForDisplayed();
        const location = await element.getLocation();
        const size = await element.getSize();
        const viewport = await browser.getWindowSize();
        
        return location.x >= 0 && location.y >= 0 &&
               location.x + size.width <= viewport.width &&
               location.y + size.height <= viewport.height;
    }
}
```

Error Handling

Try-Catch Patterns

```javascript
class ErrorHandling {
    static async safeClick(selector, timeout = 10000) {
        try {
            const element = await $(selector);
            await element.waitForClickable({ timeout });
            await element.click();
            return true;
        } catch (error) {
            console.error(`Failed to click element ${selector}: ${error.message}`);
            await browser.saveScreenshot(`./screenshots/click-error-${Date.now()}.png`);
            return false;
        }
    }

    static async safeGetText(selector, defaultText = '') {
        try {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout: 5000 });
            return await element.getText();
        } catch (error) {
            console.warn(`Failed to get text from ${selector}, using default: ${defaultText}`);
            return defaultText;
        }
    }
}
```

Retry Mechanisms

```javascript
class RetryUtils {
    static async retryAction(action, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await action();
            } catch (error) {
                lastError = error;
                console.log(`Attempt ${attempt} failed: ${error.message}`);
                
                if (attempt < maxRetries) {
                    await browser.pause(delay);
                }
            }
        }
        
        throw lastError;
    }
}
```

Performance Monitoring

Timing Utilities

```javascript
class PerformanceUtils {
    static async measurePageLoad() {
        const startTime = Date.now();
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 30000 }
        );
        return Date.now() - startTime;
    }

    static async measureActionTime(action) {
        const startTime = Date.now();
        await action();
        return Date.now() - startTime;
    }

    static async getPerformanceMetrics() {
        return await browser.execute(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                totalTime: navigation.loadEventEnd - navigation.fetchStart
            };
        });
    }
}
```