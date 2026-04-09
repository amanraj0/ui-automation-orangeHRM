# OrangeHRM UI Automation

Playwright-based E2E testing framework for OrangeHRM.

## Setup

```bash
npm install
```

## Run Tests

```bash
# All tests
npx playwright test

# Smoke tests
npm run smoke-new-employee-creation
```

## Structure

```
src/
├── configs/       # Environment & logging
├── constants/     # Endpoints, menu items
├── fixtures/      # Test fixtures & hooks
├── pages/        # Page Objects
├── test-data/    # Test data (Faker)
├── tests/       # Test specs
│   ├── e2e/     # E2E tests
│   └── setup/   # Auth setup (storage state)
└── utils/       # Utilities
```

## Key Features

- Page Object Model
- Auth caching via storage state
- Configurable timeouts & environments
- Winston logging
- Parallel execution
- Trace/screenshot on failure
