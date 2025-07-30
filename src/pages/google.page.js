class GooglePage {
    // Selectors
    get searchBox() {
        return $('textarea[name="q"]');
    }

    get searchButton() {
        return $('input[value="Google Search"], input[aria-label="Google Search"]');
    }

    get searchResults() {
        return $$('h3');
    }

    get feelingLuckyButton() {
        return $('input[value="I\'m Feeling Lucky"]');
    }

    // Actions
    async open() {
        await browser.url('https://www.google.com');
        await browser.maximizeWindow();
    }

    async search(searchTerm) {
        await this.searchBox.waitForDisplayed();
        await this.searchBox.setValue(searchTerm);
        await browser.keys('Enter');
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async waitForResults() {
        await this.searchResults[0].waitForDisplayed({ timeout: 10000 });
    }

    async getSearchResults() {
        await this.waitForResults();
        return this.searchResults;
    }

    async getPageTitle() {
        return await browser.getTitle();
    }
}

module.exports = new GooglePage();