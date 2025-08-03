exports.config = {
    // Test runner services
    runner: 'local',

    // Specs patterns
    specs: [
        './features/**/*.feature'
    ],

    // Patterns to exclude
    exclude: [],

    // Maximum instances to run in parallel
    maxInstances: 10,

    // Capabilities define which browsers to run tests in
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--no-sandbox', '--disable-dev-shm-usage']
        }
    }],

    // Test framework to use
    framework: 'cucumber',

    // Cucumber options
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

    // Test reporter
    reporters: ['spec'],

    // Logging level
    logLevel: 'info',

    // If you only want to run your tests until a specific amount of tests have failed use bail
    bail: 0,

    // Default timeout for all waitFor* commands
    waitforTimeout: 10000,

    // Default timeout in milliseconds for request
    connectionRetryTimeout: 120000,

    // Default request retries count
    connectionRetryCount: 3,

    // Services
    services: [],

    // Hooks
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