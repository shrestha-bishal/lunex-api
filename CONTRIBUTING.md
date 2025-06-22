# Contributing Guide

Thank you for your interest in contributing to **@bishal-shrestha/rest-client**. This project values high-quality, reliable code and thoughtful collaboration. This guide outlines the standards and steps for reporting issues, contributing code, or improving documentation.
---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/shrestha-bishal/rest-client-js.git
   cd rest-client-js
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the project**:
   ```bash
   npm run build
   ```
---

## Development Workflow

### Scripts

- `npm run build` – Builds the CJS, ESM, and TypeScript declaration outputs.
- `npm run test` – Executes the full test suite.
- `npm run test -- --watch` – Runs tests in watch mode during development.
- `npm run prepare` – Runs the build pipeline automatically before publishing.

### Testing

All contributions must be covered by appropriate unit tests located in the `tests/` directory. We use [Jest](https://jestjs.io/) with support for ESM and fetch mocks.

Ensure tests are:

- Deterministic (no network dependencies)
- Named clearly
- Cover edge cases when introducing retry logic, timeout handling, or new behaviors
---

## Coding Standards

- Written in TypeScript (strict mode)
- Follows a modular, composable design
- Uses consistent naming and directory structure
- Adheres to modern ES syntax (`async/await`, `Promise`, `fetch`, etc.)
- Favors readability and minimal external dependencies

> *Note: Run linters or formatters if configured. We aim to keep formatting automated and consistent.*

---

## Submitting a Pull Request

1. Create a new feature branch:
   ```bash
   git checkout -b feature/my-enhancement
   ```
2. Make and commit your changes (with a clear message).
3. Push your branch to your forked repo:
   ```bash
   git push origin feature/my-enhancement
   ```
4. Open a Pull Request:
   - Use a descriptive title and summary.
   - Reference related issues (e.g., `Fixes #12`).
   - Ensure CI passes and tests are included.
---

## Reporting Bugs or Issues

Please use the [GitHub Issues](https://github.com/shrestha-bishal/rest-client-js/issues) page and include:

- A clear title and summary
- Steps to reproduce
- Expected and actual behavior
- Code samples or screenshots (if applicable)
---

## Suggesting Enhancements

We welcome feature requests. When suggesting new functionality, describe:

- The problem you're solving
- Why it belongs in this library
- Any proposed API changes or interfaces

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE), the same as this project.

---

Thank you for contributing to **@bishal-shrestha/rest-client**.
