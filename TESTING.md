# Testing Guide

This project includes comprehensive unit tests for the scroll gradient functionality across all pages.

## Installation

First, install the required testing dependencies:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom
```

## Running Tests

### Run all tests once

```bash
npm test
```

### Run tests in watch mode (re-runs on file changes)

```bash
npm run test:watch
```

### Run tests with coverage report

```bash
npm run test:coverage
```

## Test Coverage

The test suite covers the scroll gradient functionality across three main components:

### 1. Homepage (`app/page.test.tsx`)

Tests the scroll gradient behavior on the main landing page.

### 2. Blog Post Page (`components/blog-post.test.tsx`)

Tests the scroll gradient behavior on individual blog post pages.

### 3. Writing List Page (`app/writing/writing-list-client.test.tsx`)

Tests the scroll gradient behavior on the writing list/index page.

## What's Being Tested

Each test file includes the following test cases as suggested by the recommendations:

1. **Initial State**: The `isScrolled` state is initially false when at the top of the page
2. **Scroll Down**: The `isScrolled` state becomes true after scrolling down from the top
3. **Bottom Gradient Visibility**: The `showBottomGradient` state is initially true if content extends beyond the viewport
4. **Bottom Reached**: The `showBottomGradient` state becomes false when scrolled to the very bottom of the page
5. **Event Listener**: The scroll event listener correctly updates `isScrolled` and `showBottomGradient` states
6. **Cleanup**: Scroll event listener is removed on component unmount

## Test Structure

All tests follow this pattern:

- **Setup**: Mock scroll properties and reset to initial state before each test
- **Action**: Simulate scroll events by updating window scroll properties
- **Assert**: Verify that gradient elements have the correct opacity classes

## Mocks

The tests include the following mocks to isolate the scroll gradient functionality:

- `motion/react` - Framer Motion components are mocked to avoid animation issues
- `next/image` - Next.js Image component is mocked for simpler rendering
- `next/link` - Next.js Link component is mocked for navigation testing

## Troubleshooting

If you encounter issues installing the dependencies due to npm cache permissions:

```bash
sudo chown -R $(id -u):$(id -g) "~/.npm"
```

Then retry the installation.
