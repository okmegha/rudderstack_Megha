const { expect } = require('@wdio/globals');
const GooglePage = require('../pages/google.page');

describe('Sample Web Application Test', () => {
    beforeEach(async () => {
        await GooglePage.open();
    });

    it('should open Google homepage and verify title', async () => {
        const title = await browser.getTitle();
        expect(title).toContain('Google');
    });

    it('should perform a basic search', async () => {
        await GooglePage.search('WebdriverIO');
        // Wait a moment for search to complete
        await browser.pause(2000);
        
        // Check that we're on a search results page by checking URL contains search query
        const url = await browser.getUrl();
        expect(url).toContain('search');
        expect(url).toContain('WebdriverIO');
    });
});