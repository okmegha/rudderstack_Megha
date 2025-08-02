const { sendIdentifyEvent } = require('../src/utils/apiUtils');


class ConnectionsPage {
    get dataPlaneUrl() { return $('span.sc-jrkPvW.ebfakN.text-ellipsis'); }
    get writeKey() { return $('span*=Write key'); }
    get webhookDestination() { return $('[data-testid="sub-menu-destinations"]'); }
    get eventsTab() { return $('selector-for-events-tab'); }
    get connectionsTab() { return $('[data-testid="sub-menu-connections"]'); }
    get webhookQaEnvName() {return $('div=webhookdev');}
    get webhookEvents() {return $('div=Events');}
    get deliveredCounts() {return $('div.sc-hHvloA.jFcMOz h2 span');}
    get failedCounts() {return $('div.sc-hHvloA.jFcMOz h2 span');}


    async goToConnections() {
        await this.connectionsTab.click();
        console.log('Connections page opened');
    }

    async getDataPlaneUrl() {
        const dataPlaneUrlText = await this.dataPlaneUrl.getText();
        console.log('Data Plane URL:', dataPlaneUrlText);
        return dataPlaneUrlText;
    }

    async getWriteKey() {
        const writeKeyText = await this.writeKey.getText();
        const match = writeKeyText.match(/Write key\s+(\w+)/);
        const writeKey = match ? match[1] : null;
        console.log('Write Key:', writeKey);
        return writeKey;
    }

    async sendIdentifyEvent() {
        await sendIdentifyEvent('../data/identify.json');
    }

    async clickWebhookDestination() {
        await this.webhookDestination.click();
        console.log('Webhook destination clicked');
        await this.webhookQaEnvName.click();
        console.log('Webhook QA environment clicked');
    }

    async openEventsTab() {
        await this.webhookEvents.click();
        console.log('Events tab opened');
    }

    async getDeliveredCount() {
        const deliveredCountText = await this.deliveredCounts.getText();
        const deliveredCount = parseInt(deliveredCountText, 10);
        console.log('Delivered Events Count:', deliveredCount);
        return deliveredCount;
    }

    async getFailedCount() {
        const failedCountText = await this.failedCounts.getText();
        const failedCount = parseInt(failedCountText, 10);
        console.log('Failed Events Count:', failedCount);
        return failedCount;
    }
}

module.exports = new ConnectionsPage();
