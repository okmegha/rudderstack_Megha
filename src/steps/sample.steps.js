const { Given, When, Then } = require('@wdio/cucumber-framework');
const RudderStackPage = require('../pages/loginPageStep');

Given('I open the RudderStack homepage', async () => {
    await RudderStackPage.open();
});

When('I check the page title', async () => {
    // Title check will be done in the Then step
});

Then('the title should contain {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    console.log('Page title:', title);
    console.log('Expected title:', expectedTitle);
    await expect(title).toContain(expectedTitle);
});