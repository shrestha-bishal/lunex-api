# rest-client-js

![npm](https://img.shields.io/npm/v/@bishal-shrestha/rest-client)
![License](https://img.shields.io/npm/l/@bishal-shrestha/rest-client)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)

A lightweight, extensible, and strongly-typed HTTP client for interacting with RESTful APIs with support for `GET`, `POST`, `PATCH`, `PUT`, `DELETE` in JavaScript and TypeScript. Built on the Fetch API, with built-in support for retries, timeouts, and request lifecycle hooks.

The library is fully compatible with CommonJS and ES module (ESM) environments and provides complete TypeScript typings for seamless integration in modern JavaScript and TypeScript projects.

## Features

- Full RESTful HTTP method support: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Built-in JSON and plain text response handling.
- Support for custom default headers (e.g., Authorization, API keys).
- Override headers on a per-request basis
- Add query parameters to GET requests
- Request timeout handling with configurable timeout duration.
- Optional retry logic for transient server errors with exponential backoff.
- Detailed error reporting including HTTP status, status text, and response body.
- Compatible with CommonJS, ESM, and fully typed for TypeScript


## API Reference
### `getAsync(routeParam?: string, queryParams?: object, headers?: object, controller?: AbortController): Promise<any>`

Sends a GET request to the specified route with optional query parameters and headers.

- `routeParam`: Optional route to append to the base URL
- `queryParams`: Object containing query string parameters
- `headers`: Per-request headers
- `controller`: Optional AbortController for cancellation

### `postAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a POST request with a JSON payload.

- `routeParam`: API route path
- `data`: JSON-serializable body
- `headers`: Optional headers
- `controller`: Optional AbortController

### `putAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a PUT request with a JSON payload.

### `patchAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a PATCH request with a JSON payload.

### `deleteAsync(routeParam: string, headers?: object, controller?: AbortController): Promise<any>`

Sends a DELETE request to the specified route.

## Installation

```bash
npm install rest-client-js
```

## Basic Usage
```ts
import { RestClient, RestClientOptions } from 'rest-client-js';

const client = new RestClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN'
}, new RestClientOptions({
  timeout: 8000,
  maxRetries: 2
}));

(async () => {
  try {
    const result = await client.getAsync('/users', { active: true });
    console.log(result);
  } catch (error) {
    console.error('API request failed:', error);
  }
})();
```

```ts
const controller = new AbortController();
setTimeout(() => controller.abort(), 3000); // Custom 3s timeout

await client.getAsync('/delayed-endpoint', {}, {}, controller);
```

### CommonJS Usage (for older Node.js projects)
```js
const { RestClient, RestClientOptions } = require('rest-client-js');

const client = new RestClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN'
}, new RestClientOptions({ timeout: 5000 }));
```

## Configuration Options
### Retry Policy
The library includes a default retry policy that retries on HTTP status codes 502, 503, and 504. You can override this behavior with a custom function:

```ts
import { shouldRetry } from 'rest-client-js';

const options = new RestClientOptions({
  maxRetries: 3,
  shouldRetry: shouldRetry
});
```

### Request Lifecycle Hooks
Hooks allow you to monitor and log request behavior:

```ts
const options = new RestClientOptions({
  onRequestStart: (method, url) => {
    console.log(`Starting request: ${method} ${url}`);
  },
  onRequestEnd: (response) => {
    console.log(`Response received: ${response.status}`);
  },
  onRequestError: (error) => {
    console.error('Request error:', error);
  }
});
``` 

## Response Handling
- JSON responses are automatically parsed when the Content-Type is application/json
- Plain text responses are returned as strings
- 204 No Content responses return null

## Contributing

Contributions, issues, and feature requests are welcome.  
Feel free to open a pull request or issue to improve the project.

This project is licensed under the [MIT License](./LICENSE).

© 2025 Bishal Shrestha, All rights reserved