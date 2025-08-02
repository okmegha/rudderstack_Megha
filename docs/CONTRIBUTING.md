# Contributing Guide

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/rudderstack_Megha.git
   cd rudderstack_Megha
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Writing Tests

#### Feature Files
- Write BDD scenarios in `features/` directory
- Use clear, descriptive scenario names
- Follow Gherkin best practices

#### Step Definitions
- Implement steps in `src/steps/`
- Keep steps reusable and atomic
- Use proper async/await patterns

#### Page Objects
- Create page objects in `src/pages/`
- Use meaningful selector names
- Implement helper methods for common actions

### 3. Testing Your Changes

#### Local Testing
```bash
# Test on QA environment
npm run test:qa

# Test specific feature
npx wdio run wdio.conf.js --spec features/your-feature.feature
```

#### Environment Testing
```bash
# Test all environments
npm run test:dev
npm run test:qa
npm run test:prod
```

### 4. Code Quality

#### Before Committing
- Ensure all tests pass
- Follow naming conventions
- Add appropriate comments
- Update documentation if needed

### 5. Submit Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use clear title and description
   - Link to related issues
   - Add screenshots if UI changes

3. **Review Process**
   - Automated tests will run
   - Code review by team members
   - Address feedback if needed

## Best Practices

### BDD Scenarios
- Use business-readable language
- Follow Given-When-Then structure
- Keep scenarios focused and independent

### Page Objects
- One page object per page/component
- Use descriptive method names
- Implement wait strategies

### Step Definitions
- Make steps reusable across scenarios
- Use parameters for dynamic data
- Keep step logic simple

## Code Standards

### JavaScript/TypeScript
- Use async/await for asynchronous operations
- Follow camelCase naming convention
- Add JSDoc comments for complex functions

### File Organization
```
src/
├── pages/          # Page objects
├── steps/          # Step definitions
└── utils/          # Helper utilities
```

## Environment Management

### Adding New Environments
1. Create `.env.{environment}` file
2. Add npm script in `package.json`
3. Update GitHub workflow if needed

### Credentials
- Never commit actual credentials
- Use environment variables
- Update `.gitignore` for sensitive files

## Debugging

### Test Failures
- Check screenshots in `screenshots/`
- Review console logs
- Use browser developer tools

### Local Development
```bash
# Verbose logging
DEBUG=true npm run test:qa

# Headful mode (see browser)
HEADLESS=false npm run test:qa
```

## Documentation

### Update Documentation
- README.md for user-facing changes
- CONTRIBUTING.md for development changes
- Inline comments for complex logic

### Screenshots
- Include relevant screenshots in PRs
- Update test documentation images

## Release Process

### Versioning
- Follow semantic versioning
- Update package.json version
- Create release notes

### Deployment
- Merge to main/master branch
- Automated tests run via GitHub Actions
- Monitor daily test results

## Support

### Getting Help
- Check existing documentation
- Review GitHub issues
- Ask team members
- Create new issue if needed

### Reporting Issues
- Use issue templates
- Include reproduction steps
- Add relevant logs/screenshots
- Specify environment details