Contributing Guide

Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch
5. Make your changes
6. Run tests to ensure everything works
7. Commit your changes with clear messages
8. Push to your fork
9. Create a pull request

Development Workflow

1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
git checkout -b bugfix/issue-description
```

2. Writing Tests

Feature Files

Write clear, readable Gherkin scenarios in the `features/` directory.
Use present tense and active voice.
Keep scenarios focused on business value.

Step Definitions

Implement step definitions in `src/steps/`.
Keep steps reusable and atomic.
Use page objects for UI interactions.

Page Objects

Create page objects in `src/pages/`.
Use getter methods for element selectors.
Implement action methods for user interactions.

3. Testing Your Changes

Local Testing

```bash
npm run test:qa
npm run test:dev
```

Environment Testing

```bash
npm run test:dev
npm run test:qa
npm run test:prod
```

4. Code Quality

Before Committing

```bash
npm run clean
npm test
```

5. Submit Pull Request

Create a descriptive title
Include a detailed description of changes
Reference any related issues
Ensure all tests pass
Request review from team members

Best Practices

BDD Scenarios

Write from the user's perspective
Focus on behavior, not implementation
Keep scenarios independent and isolated

Page Objects

Use descriptive element names
Implement wait strategies
Group related functionality

Step Definitions

Keep steps simple and focused
Avoid UI logic in step files
Use page objects for interactions

Code Standards

JavaScript/TypeScript

Use consistent indentation (2 spaces)
Follow camelCase naming convention
Add JSDoc comments for public methods
Handle errors appropriately

File Organization

```
src/
├── pages/          # Page object classes
├── steps/          # Step definition files  
├── utils/          # Utility functions
└── specs/          # Test specifications
```

Environment Management

Adding New Environments

1. Create `.env.{environment}` file
2. Add environment-specific configurations
3. Update npm scripts in package.json

Credentials

Store sensitive data in environment files
Never commit actual credentials to version control
Use placeholder values in template files

Debugging

Test Failures

Check screenshots in `screenshots/` directory
Review logs for error messages
Use browser developer tools for element inspection

Local Development

```bash
npm run test:dev -- --verbose
npm run test:dev -- --headful
```

Documentation

Update Documentation

Keep README.md current
Update API documentation for new features
Add examples for complex functionality

Screenshots

Include screenshots for visual changes
Update documentation images when UI changes

Release Process

Versioning

Follow semantic versioning (semver)
Tag releases with version numbers
Update CHANGELOG.md with release notes

Deployment

Test in staging environment first
Run full test suite before release
Document deployment steps

Support

Getting Help

Check existing documentation first
Search issues for similar problems
Create detailed issue reports with reproduction steps

Reporting Issues

Use issue templates when available
Include environment information
Provide clear reproduction steps