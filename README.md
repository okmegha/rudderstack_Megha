# WebdriverIO + CucumberJS Test Framework

A basic test automation framework using WebdriverIO and CucumberJS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npm test
```

## Project Structure

```
├── features/           # Cucumber feature files
├── src/
│   ├── pages/         # Page Object Model files
│   ├── steps/         # Step definitions
│   └── utils/         # Utility functions
├── screenshots/       # Test screenshots
└── wdio.conf.js      # WebdriverIO configuration
```

## Running Tests

- Run all tests: `npm test`
- Run specific suite: `npm run test:chrome`

## Key Features

- **Page Object Model**: Organized page objects for maintainable tests
- **Cucumber BDD**: Gherkin syntax for readable test scenarios
- **Screenshot capture**: Automatic screenshots on test failure
- **Multiple browser support**: Chrome (default), Firefox
- **Parallel execution**: Configurable parallel test execution

## Sample Test

The framework includes a sample test that:
1. Opens Google homepage
2. Verifies page title
3. Performs a search
4. Validates search results

## Configuration

Key configuration options in `wdio.conf.js`:
- Browser capabilities
- Test timeout settings
- Reporter configuration
- Screenshot settings