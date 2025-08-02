const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/loginPage');
const ConnectionPage = require('../../pageobjects/ConnectionPage');

let dataPlaneUrl, writeKey;

Given('I log in to the Rudderstack dashboard', async () => {
    await LoginPage.login();
});

When('I navigate to the Connections page', async () => {
    await ConnectionPage.goToConnections();
});

When('I store the Data Plane URL', async () => {
    await ConnectionPage.getDataPlaneUrl();
});

When('I store the Write Key of the HTTP source', async () => {
    await ConnectionPage.getWriteKey();
});

When('I send a sample event using browser script', async () => {
    const payload = {
        userId: "ui_test_user",
        event: "UI Test Event",
        properties: { action: "click", label: "test" }
    };

    await browser.executeAsync((url, key, data, done) => {
        fetch(`${url}/v1/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            },
            body: JSON.stringify(data)
        })
        .then(res => done(`Status: ${res.status}`))
        .catch(err => done(`Error: ${err.message}`));
    }, dataPlaneUrl, writeKey, payload);
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
