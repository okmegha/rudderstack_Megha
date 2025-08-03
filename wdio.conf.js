exports.config = {
    runner: 'local',
    specs: [
        './features/**/*.feature'
    ],

    exclude: [],
    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--no-sandbox', '--disable-dev-shm-usage']
        }
    }],

    framework: 'cucumber',
    cucumberOpts: {
        require: ['./src/steps/**/*.js', './src/pages/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },

    reporters: ['spec'],
    logLevel: 'info',

    bail: 0,
    waitforTimeout: 10000,

    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [],
    beforeSession: function (config, capabilities, specs) {
        console.log('Starting WebDriver session...');
    },

    before: function (capabilities, specs) {
        console.log('Before hook - setting up test environment');
    },

    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            browser.takeScreenshot();
        }
    },

    after: function (result, capabilities, specs) {
        console.log('After hook - cleaning up test environment');
    },

    afterSession: function (config, capabilities, specs) {
        console.log('WebDriver session ended');
    }
};