const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pages/LoginPage');
const ConnectionPage = require('../pages/ConnectionPage');
const { sendIdentifyEvent } = require('../utils/apiUtils');
const TestDataStore = require('../utils/TestDataStore');

Given('I log in to the Rudderstack dashboard', async () => {
    await LoginPage.login();
});

When('I navigate to the Connections page', async () => {
    await ConnectionPage.goToConnections();
});

When('I store the Data Plane URL', async () => {
    const dataPlaneUrl = await ConnectionPage.getDataPlaneUrl();
    TestDataStore.setDataPlaneUrl(dataPlaneUrl);
});

When('I store the Write Key of the HTTP source', async () => {
    const writeKey = await ConnectionPage.getWriteKey();
    TestDataStore.setWriteKey(writeKey);
});

When('I send a sample event using browser script', async () => {
    try {
        await sendIdentifyEvent('./data/identify.json');
        console.log('Sample event sent successfully');
    } catch (error) {
        console.error('Failed to send sample event:', error.message);
        throw error;
    }
});

When('I click on the webhook destination', async () => {
    await ConnectionPage.clickWebhookDestination();
});

When('I open the events tab', async () => {
    await ConnectionPage.openEventsTab();
});

Then('I read and log the delivered and failed event counts', async () => {
    const delivered = await ConnectionPage.getDeliveredCount();
    const failed = await ConnectionPage.getFailedCount();

    console.log(`Delivered Events: ${delivered}`);
    console.log(`Failed Events: ${failed}`);
});
