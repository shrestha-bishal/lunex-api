# rest-client-js

A lightweight and flexible JavaScript API client library that simplifies making HTTP requests wit support for `GET`, `POST`, `PATCH`, `PUT`, `DELETE`.

## Features

- Full RESTful HTTP method support: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Built-in JSON and plain text response handling.
- Support for custom default headers (e.g., Authorization, API keys).
- Per-request headers override capability.
- Supports query parameters in GET requests.
- Request timeout handling with configurable timeout duration.
- Optional retry logic for transient server errors with exponential backoff.
- Detailed error reporting including HTTP status, status text, and response body.
- Clean ES module syntax for modern JavaScript projects.
- Utility class `Core` for rendering HTML content and extracting form data.
- Standardized `ActionPayload` wrapper for API actions and data.

## Installation

```bash
npm install rest-client-js
