module.exports = {
    TIMEOUTS: {
        DEFAULT_WAIT: 15000,
        LONG_WAIT: 30000,
        SHORT_WAIT: 5000,
        PAGE_LOAD: 30000,
        API_REQUEST: 30000
    },

    WAIT_STRATEGIES: {
        DISPLAYED: 'displayed',
        CLICKABLE: 'clickable',
        ENABLED: 'enabled',
        EXISTS: 'exists'
    },

    API: {
        ENDPOINTS: {
            IDENTIFY: '/v1/identify',
            TRACK: '/v1/track',
            PAGE: '/v1/page',
            SCREEN: '/v1/screen',
            GROUP: '/v1/group',
            ALIAS: '/v1/alias'
        },
        METHODS: {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            PATCH: 'PATCH'
        },
        HEADERS: {
            CONTENT_TYPE: 'application/json',
            USER_AGENT: 'RudderStack-Test-Automation/1.0'
        }
    },

    TEST_DATA: {
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE_PATTERN: /^\+?[\d\s-()]+$/,
        UUID_PATTERN: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    },

    BROWSER: {
        DEFAULT_VIEWPORT: {
            width: 1920,
            height: 1080
        },
        MOBILE_VIEWPORT: {
            width: 375,
            height: 667
        }
    },

    PATHS: {
        SCREENSHOTS: './screenshots',
        TEST_DATA: './data',
        REPORTS: './reports',
        LOGS: './logs'
    },

    ERRORS: {
        ELEMENT_NOT_FOUND: 'Element not found within timeout period',
        API_REQUEST_FAILED: 'API request failed',
        LOGIN_FAILED: 'Login attempt failed',
        DATA_NOT_FOUND: 'Required test data not found',
        INVALID_CREDENTIALS: 'Invalid or missing credentials',
        NETWORK_ERROR: 'Network connection error'
    },

    SUCCESS: {
        LOGIN_COMPLETED: 'Login completed successfully',
        API_REQUEST_SUCCESS: 'API request completed successfully',
        TEST_DATA_STORED: 'Test data stored successfully',
        NAVIGATION_SUCCESS: 'Navigation completed successfully'
    },

    LOG_LEVELS: {
        ERROR: 'error',
        WARN: 'warn',
        INFO: 'info',
        DEBUG: 'debug',
        TRACE: 'trace'
    },

    ENVIRONMENTS: {
        DEVELOPMENT: 'dev',
        QA: 'qa',
        STAGING: 'staging',
        PRODUCTION: 'prod'
    },

    CHARSETS: {
        ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        NUMERIC: '0123456789',
        ALPHABETIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
        UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },

    RETRY: {
        MAX_ATTEMPTS: 3,
        INITIAL_DELAY: 1000,
        MAX_DELAY: 10000,
        BACKOFF_FACTOR: 2
    }
};