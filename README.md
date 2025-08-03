# RudderStack WebDriverIO Test Framework

A WebDriverIO + Cucumber framework for automated testing of RudderStack applications.

## Prerequisites

- Node.js (v14 or higher)
- Chrome/Firefox browser

## Installation

```bash
npm install
```

## Running Tests

### Environment-specific Tests

```bash
# Development Environment
npm run test:dev

# QA Environment  
npm run test:qa

# Production Environment
npm run test:prod
```

### Browser-specific Tests

```bash
# Chrome browser
npm run test:chrome

# Firefox browser
npm run test:firefox
```

### Default Test

```bash
# Run with default configuration
npm test
```

## Environment Configuration

Each environment has its own configuration file:

- `.env.dev` - Development environment credentials
- `.env.qa` - QA environment credentials  
- `.env.prod` - Production environment credentials

The test scripts automatically switch between environments by copying the appropriate `.env.*` file to `.env`.

## Project Structure

```
├── config/
│   └── environments.js     # Environment configuration
├── data/
│   └── identify.json       # Test data
├── features/
│   └── rudderstack.feature # Cucumber feature files
├── src/
│   ├── pages/              # Page objects
│   ├── steps/              # Step definitions
│   └── utils/              # Utility functions
└── screenshots/            # Test screenshots

```

## Utilities

```bash
# Clean test artifacts
npm run clean
