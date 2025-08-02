# RudderStack E2E Test Automation Framework

A comprehensive test automation framework using WebdriverIO and CucumberJS for testing RudderStack applications across multiple environments.

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd rudderstack_Megha
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
npm run setup:env
```

4. **Run tests**
```bash
# Run tests on QA environment (default)
npm run test:qa

# Run tests on Development environment
npm run test:dev

# Run tests on Production environment
npm run test:prod
```

## 📁 Project Structure

```
rudderstack_Megha/
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── daily-tests.yml     # Daily scheduled tests
│       └── pr-tests.yml        # Pull request tests
├── features/               # Cucumber feature files
│   └── sample.feature          # Sample BDD scenarios
├── src/
│   ├── pages/             # Page Object Model files
│   │   └── google.page.js      # Sample page object
│   ├── steps/             # Cucumber step definitions
│   │   └── sample.steps.js     # Sample step implementations
│   └── utils/             # Utility functions and helpers
│       └── helpers.js          # Common utility functions
├── screenshots/           # Test screenshots (auto-generated)
├── allure-results/        # Test results and reports
├── .env.dev              # Development environment config
├── .env.qa               # QA environment config
├── .env.prod             # Production environment config
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── wdio.conf.js          # WebdriverIO configuration
└── README.md             # This file
```

## 🛠️ Environment Configuration

The framework supports multiple environments with dedicated configuration files:

### Environment Files
- **`.env.dev`** - Development environment settings
- **`.env.qa`** - QA environment settings  
- **`.env.prod`** - Production environment settings

### Environment Variables
```bash
BASE_URL=https://app.rudderstack.com
API_URL=https://api.rudderstack.com
USERNAME=dodafem371@7tul.com
PASSWORD=Megha@rudderstack1
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run tests with default configuration |
| `npm run test:dev` | Run tests on Development environment |
| `npm run test:qa` | Run tests on QA environment |
| `npm run test:prod` | Run tests on Production environment |
| `npm run test:chrome` | Run tests specifically on Chrome |
| `npm run test:firefox` | Run tests specifically on Firefox |
| `npm run clean` | Clean up test artifacts and screenshots |
| `npm run setup:env` | Display environment setup information |

## 🔧 Framework Features

### Core Technologies
- **WebdriverIO v7.31.1** - Browser automation
- **CucumberJS** - BDD test framework
- **TypeScript** - Type safety and modern JavaScript
- **Chrome DevTools Protocol** - Fast and reliable browser control

### Key Capabilities
- ✅ **Multi-environment support** - Dev, QA, Production
- ✅ **Page Object Model** - Maintainable and reusable page objects
- ✅ **BDD with Gherkin** - Human-readable test scenarios
- ✅ **Screenshot capture** - Automatic screenshots on failure
- ✅ **Cross-browser testing** - Chrome and Firefox support
- ✅ **CI/CD integration** - GitHub Actions workflows
- ✅ **Daily scheduling** - Automated daily test execution
- ✅ **Artifact management** - Test results and screenshot storage

## 🧪 Writing Tests

### 1. Create Feature Files
Write BDD scenarios in `features/` directory:

```gherkin
Feature: User Authentication
  As a user
  I want to log into RudderStack
  So that I can access my dashboard

  Scenario: Successful login
    Given I open the RudderStack login page
    When I enter valid credentials
    Then I should see the dashboard
```

### 2. Implement Step Definitions
Create step implementations in `src/steps/`:

```javascript
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given('I open the RudderStack login page', async () => {
    await LoginPage.open();
});
```

### 3. Create Page Objects
Build page objects in `src/pages/`:

```javascript
class LoginPage {
    get usernameInput() { return $('[data-testid="username"]'); }
    get passwordInput() { return $('[data-testid="password"]'); }
    
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
    }
}
```

## 🔄 CI/CD Integration

### GitHub Actions Workflows

#### Daily Tests (`daily-tests.yml`)
- **Schedule**: Runs daily at 9:00 AM UTC
- **Environments**: Tests all environments (Dev → QA → Prod)
- **Triggers**: Scheduled, manual, push to main/master
- **Artifacts**: Stores test results and screenshots for 30 days

#### Pull Request Tests (`pr-tests.yml`)
- **Trigger**: On pull request creation/updates
- **Environment**: QA only
- **Purpose**: Validate changes before merge
- **Artifacts**: Stores results for 7 days

### Manual Execution
Trigger workflows manually via GitHub Actions UI or:
```bash
gh workflow run daily-tests.yml
```

## 🐛 Debugging

### Test Failures
1. Check screenshots in `screenshots/` directory
2. Review test logs in console output
3. Examine artifacts in GitHub Actions

### Local Development
```bash
# Run with verbose logging
DEBUG=true npm run test:qa

# Run specific feature
npx wdio run wdio.conf.js --spec features/login.feature
```

## 📈 Reporting

- **Console Reports**: Real-time test execution feedback
- **Screenshots**: Captured automatically on failures
- **Artifacts**: Available in GitHub Actions for download

## 🔒 Security

- Environment files contain sensitive credentials
- **Never commit `.env` files to version control**
- Use GitHub Secrets for CI/CD environments
- Credentials are managed per environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests following BDD principles
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Review existing documentation
- Check GitHub Actions logs for CI/CD issues

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for RudderStack QA Team**