const { sendIdentifyEvent } = require('../utils/apiUtils');
const TestDataStore = require('../utils/TestDataStore');

class ConnectionsPage {
    get dataPlaneUrl() { 
        return $('span.sc-jrkPvW.ebfakN.text-ellipsis'); 
    }
    
    get writeKey() { 
        return $('span*=Write key'); 
    }
    
    get webhookDestination() { 
        return $('[data-testid="sub-menu-destinations"]'); 
    }
    
    get connectionsTab() { 
        return $('[data-testid="sub-menu-connections"]'); 
    }
    
    get webhookQaEnvName() {
        return $('.//div[normalize-space() = "webhookdev"]');
    }
    
    get webhookEvents() {
        return $('.//div[normalize-space() = "Events"]');
    }
    
    get deliveredCounts() {
        return $('//h2[contains(text(), "Delivered")]/following-sibling::*//span | //span[contains(text(), "Delivered")]/following-sibling::span | //div[contains(@class, "delivered") or contains(text(), "Delivered")]//span');
    }
    
    get failedCounts() {
        return $('//h2[contains(text(), "Failed")]/following-sibling::*//span | //span[contains(text(), "Failed")]/following-sibling::span | //div[contains(@class, "failed") or contains(text(), "Failed")]//span');
    }
    
    get allEventCounts() {
        return $$('//div[contains(@class, "metric") or contains(@class, "count") or contains(@class, "stat")]//span[number(.) = number(.)] | //span[number(.) = number(.)]');
    }


    async goToConnections() {
        await TestDataStore.waitForElement(this.connectionsTab);
        await this.connectionsTab.click();
        console.log('✓ Navigated to Connections page');
    }

    async getDataPlaneUrl() {
        await TestDataStore.waitForElement(this.dataPlaneUrl);
        const dataPlaneUrlText = await this.dataPlaneUrl.getText();
        
        if (!dataPlaneUrlText) {
            throw new Error('Data plane URL not found or empty');
        }
        
        console.log('✓ Data Plane URL retrieved:', dataPlaneUrlText);
        return dataPlaneUrlText;
    }

    async getWriteKey() {
        await TestDataStore.waitForElement(this.writeKey);
        const writeKeyText = await this.writeKey.getText();
        const match = writeKeyText.match(/Write key\s+(\w+)/);
        const writeKey = match ? match[1] : null;
        
        if (!writeKey) {
            throw new Error('Write key not found in text: ' + writeKeyText);
        }
        
        console.log('✓ Write Key retrieved:', writeKey.substring(0, 8) + '...');
        return writeKey;
    }

    async getIdentifyEventPayload() {
        const identifyEventPayload = {
            userId: `user_${TestDataStore.generateRandomString(8)}`,
            anonymousId: `anon_${TestDataStore.generateRandomString(8)}`,
            context: {
                traits: {
                    trait1: "test-value",
                    environment: "automation"
                },
                ip: "127.0.0.1",
                library: {
                    name: "webdriverio-automation",
                    version: "1.0.0"
                }
            },
            timestamp: TestDataStore.getTimestamp()
        };
        console.log('✓ Generated identify event payload with dynamic data');
        return identifyEventPayload;
    }

    async sendIdentifyEvent() {
        try {
            await sendIdentifyEvent('./data/identify.json');
            console.log('✓ Identify event sent successfully');
        } catch (error) {
            console.error('✗ Failed to send identify event:', error.message);
            throw error;
        }
    }

    async clickWebhookDestination() {
        await TestDataStore.waitForElement(this.webhookDestination);
        await this.webhookDestination.click();
        console.log('✓ Webhook destination clicked');
        
        await TestDataStore.waitForElement(this.webhookQaEnvName);
        await this.webhookQaEnvName.click();
        console.log('✓ Webhook QA environment selected');
    }

    async openEventsTab() {
        await TestDataStore.waitForElement(this.webhookEvents);
        await this.webhookEvents.click();
        console.log('✓ Events tab opened');
    }

    async getEventCounts() {
        console.log('🔍 Searching for event counts on the page...');
        
        await TestDataStore.wait(3000, 'page content to load');
        
        try {
            const allCountElements = await $$('//span[number(.) = number(.)]');
            console.log(`Found ${allCountElements.length} numeric elements`);
            
            if (allCountElements.length >= 2) {
                const counts = [];
                for (let i = 0; i < Math.min(allCountElements.length, 4); i++) {
                    const text = await allCountElements[i].getText();
                    const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
                    if (!isNaN(num)) {
                        counts.push(num);
                    }
                }
                
                console.log('📊 Found numeric values:', counts);
                
                return {
                    delivered: counts[0] || 0,
                    failed: counts[1] || 0
                };
            }
            
            const pageText = await $('body').getText();
            const deliveredMatch = pageText.match(/Delivered[:\s]*(\d+)/i);
            const failedMatch = pageText.match(/Failed[:\s]*(\d+)/i);
            
            if (deliveredMatch || failedMatch) {
                return {
                    delivered: deliveredMatch ? parseInt(deliveredMatch[1], 10) : 0,
                    failed: failedMatch ? parseInt(failedMatch[1], 10) : 0
                };
            }
            
            console.log('⚠️ No event counts found, returning zeros');
            return {
                delivered: 0,
                failed: 0
            };
            
        } catch (error) {
            console.log('⚠️ Error getting event counts:', error.message);
            return {
                delivered: 0,
                failed: 0
            };
        }
    }

    async getDeliveredCount() {
        const counts = await this.getEventCounts();
        console.log('✓ Delivered Events Count:', counts.delivered);
        return counts.delivered;
    }

    async getFailedCount() {
        const counts = await this.getEventCounts();
        console.log('✓ Failed Events Count:', counts.failed);
        return counts.failed;
    }
}

module.exports = new ConnectionsPage();
