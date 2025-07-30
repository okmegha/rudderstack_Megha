const { Given, When, Then } = require('@wdio/cucumber-framework');
const GooglePage = require('../pages/google.page');

Given('I open the Google homepage', async () => {
    await GooglePage.open();
});

When('I check the page title', async () => {
    // Title check will be done in the Then step
});

Then('the title should contain {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    await expect(title).toContain(expectedTitle);
});

When('I search for {string}', async (searchTerm) => {
    await GooglePage.search(searchTerm);
});

Then('I should see search results in the URL', async () => {
    // Wait a moment for search to complete
    await browser.pause(2000);
    
    // Check that we're on a search results page by checking URL contains search query
    const url = await browser.getUrl();
    await expect(url).toContain('search');
    await expect(url).toContain('WebdriverIO');
});