# Framework API Documentation

## Page Objects

### Base Page Object Pattern

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

### Selectors Best Practices

```javascript
class LoginPage extends BasePage {
    // Use getter methods for selectors
    get usernameInput() { return $('[data-testid="username"]'); }
    get passwordInput() { return $('[data-testid="password"]'); }
    get loginButton() { return $('[data-testid="login-btn"]'); }
    
    // Action methods
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}
```

## Step Definitions

### Basic Pattern

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

### Parameter Handling

```javascript
// String parameters
Then('the title should contain {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    await expect(title).toContain(expectedTitle);
});

// Number parameters
When('I wait for {int} seconds', async (seconds) => {
    await browser.pause(seconds * 1000);
});

// Data tables
When('I fill the form with:', async (dataTable) => {
    const data = dataTable.hashes()[0];
    await FormPage.fillForm(data);
});
```

## Utility Functions

### Wait Helpers

```javascript
class WaitHelpers {
    static async waitForElement(selector, timeout = 10000) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async waitForText(selector, text, timeout = 10000) {
        await browser.waitUntil(
            async () => {
                const element = await $(selector);
                const elementText = await element.getText();
                return elementText.includes(text);
            },
            { timeout, timeoutMsg: `Text "${text}" not found in element ${selector}` }
        );
    }

    static async waitForUrl(expectedUrl, timeout = 10000) {
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes(expectedUrl);
            },
            { timeout, timeoutMsg: `URL did not change to ${expectedUrl}` }
        );
    }
}
```

### Screenshot Helpers

```javascript
class ScreenshotHelpers {
    static async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `./screenshots/${name}-${timestamp}.png`;
        await browser.saveScreenshot(filename);
        console.log(`Screenshot saved: ${filename}`);
        return filename;
    }

    static async takeElementScreenshot(selector, name) {
        const element = await $(selector);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `./screenshots/${name}-element-${timestamp}.png`;
        await element.saveScreenshot(filename);
        return filename;
    }
}
```

### Data Helpers

```javascript
class DataHelpers {
    static generateRandomEmail() {
        const timestamp = Date.now();
        return `test.user.${timestamp}@example.com`;
    }

    static generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static getCurrentTimestamp() {
        return new Date().toISOString();
    }
}
```

## Environment Configuration

### Using Environment Config

```javascript
const envConfig = require('../config/environments');

class ApiHelpers {
    static async makeApiRequest(endpoint) {
        const baseUrl = envConfig.getApiUrl();
        const response = await fetch(`${baseUrl}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${envConfig.get('API_TOKEN')}`
            }
        });
        return response.json();
    }
}
```

### Environment-Specific Logic

```javascript
describe('Environment-specific tests', () => {
    it('should run different logic per environment', async () => {
        if (envConfig.isProduction()) {
            // Production-specific test logic
            await expect(ProductionPage.banner).toBeDisplayed();
        } else if (envConfig.isDevelopment()) {
            // Development-specific test logic
            await expect(DebugPanel.panel).toBeDisplayed();
        }
    });
});
```

## Assertions

### WebdriverIO Expect

```javascript
// Element assertions
await expect(element).toBeDisplayed();
await expect(element).toHaveText('Expected text');
await expect(element).toHaveAttribute('class', 'active');

// Browser assertions
await expect(browser).toHaveUrl('https://example.com');
await expect(browser).toHaveTitle('Page Title');

// Custom assertions
await expect(elements).toHaveLength(5);
await expect(value).toBeGreaterThan(10);
```

### Custom Matchers

```javascript
class CustomMatchers {
    static async toContainCaseInsensitive(actual, expected) {
        const actualLower = actual.toLowerCase();
        const expectedLower = expected.toLowerCase();
        return actualLower.includes(expectedLower);
    }

    static async toBeWithinRange(actual, min, max) {
        return actual >= min && actual <= max;
    }
}
```

## Error Handling

### Try-Catch Patterns

```javascript
async function safeAction(action, fallback = null) {
    try {
        return await action();
    } catch (error) {
        console.log(`Action failed: ${error.message}`);
        if (fallback) {
            return await fallback();
        }
        throw error;
    }
}

// Usage
await safeAction(
    () => LoginPage.fastLogin(),
    () => LoginPage.standardLogin()
);
```

### Retry Mechanisms

```javascript
async function retryAction(action, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await action();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await browser.pause(1000); // Wait before retry
        }
    }
}
```

## Performance Monitoring

### Timing Utilities

```javascript
class PerformanceHelpers {
    static async measurePageLoad() {
        const start = Date.now();
        await browser.url('/');
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 30000 }
        );
        const end = Date.now();
        return end - start;
    }

    static async measureAction(action, actionName) {
        const start = Date.now();
        await action();
        const end = Date.now();
        console.log(`${actionName} took ${end - start}ms`);
        return end - start;
    }
}
```