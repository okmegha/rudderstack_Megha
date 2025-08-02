const envConfig = require('../../config/environments');

class RudderStackPage {
    // Selectors
    get logo() {
        return $('img[alt*="RudderStack"], .logo, [data-testid="logo"]');
    }

    get navigationMenu() {
        return $('.navigation, .nav, [data-testid="nav"]');
    }

    get signInButton() {
        return $('a[href*="signin"], button[data-testid="signin"], .sign-in');
    }

    get getStartedButton() {
        return $('a[href*="signup"], button[data-testid="signup"], .get-started');
    }

    // Actions
    async open() {
        const baseUrl = envConfig.getBaseUrl();
        await browser.url(baseUrl);
        
        // Note: maximizeWindow not available in devtools protocol, using setWindowSize instead
        try {
            await browser.setWindowSize(1280, 1024);
        } catch (e) {
            // If setWindowSize fails, continue without maximizing
            console.log('Window resize not supported in current mode');
        }
        
        // Wait for page to load
        await this.waitForPageLoad();
    }

    async waitForPageLoad() {
        // Wait for the page to be fully loaded
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 15000, timeoutMsg: 'RudderStack page did not load within 15 seconds' }
        );
    }

    async clickSignIn() {
        await this.signInButton.waitForDisplayed({ timeout: 10000 });
        await this.signInButton.click();
    }

    async clickGetStarted() {
        await this.getStartedButton.waitForDisplayed({ timeout: 10000 });
        await this.getStartedButton.click();
    }

    async getPageTitle() {
        return await browser.getTitle();
    }

    async isLogoDisplayed() {
        try {
            await this.logo.waitForDisplayed({ timeout: 5000 });
            return await this.logo.isDisplayed();
        } catch {
            return false;
        }
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }
}

module.exports = new RudderStackPage();