RudderStack WebDriverIO Test Framework

WebDriverIO + Cucumber framework for automated testing of RudderStack applications.

Prerequisites

- Node.js (v14 or higher)
- Chrome/Firefox browser

Installation

```bash
npm install
```

Running Tests

Environment-specific Tests

```bash
npm run test:dev
npm run test:qa  
npm run test:prod
```

Browser-specific Tests

```bash
npm run test:chrome
npm run test:firefox
```

Default Test

```bash
npm test
```

Environment Configuration

Each environment has its own configuration file:

- `.env.dev` - Development environment credentials
- `.env.qa` - QA environment credentials  
- `.env.prod` - Production environment credentials

The test scripts automatically switch between environments by copying the appropriate `.env.*` file to `.env`.          

```

Utilities

```bash
npm run clean
```