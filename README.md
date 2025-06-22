# @bishal-shrestha/rest-client

![npm](https://img.shields.io/npm/v/@bishal-shrestha/rest-client)
![License](https://img.shields.io/npm/l/@bishal-shrestha/rest-client)
![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-blue)
![Downloads](https://img.shields.io/npm/dm/@bishal-shrestha/rest-client)
[![npm](https://img.shields.io/badge/npm-View%20Package-red?logo=npm&logoColor=white&style=flat-square)](https://www.npmjs.com/package/@bishal-shrestha/rest-client)

A lightweight, extensible, and strongly-typed HTTP client for interacting with RESTful APIs with support for `GET`, `POST`, `PATCH`, `PUT`, `DELETE` in JavaScript and TypeScript. Built on the Fetch API, with built-in support for retries, timeouts, and request lifecycle hooks.

The library is fully compatible with CommonJS and ES module (ESM) environments and provides complete TypeScript typings for seamless integration in modern JavaScript and TypeScript projects.

[View Package in npm](https://www.npmjs.com/package/@bishal-shrestha/rest-client)

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
#### `getAsync(routeParam?: string, queryParams?: object, headers?: object, controller?: AbortController): Promise<any>`

Sends a GET request to the specified route with optional query parameters and headers.

- `routeParam`: Optional route to append to the base URL
- `queryParams`: Object containing query string parameters
- `headers`: Per-request headers
- `controller`: Optional AbortController for cancellation

#### `postAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a POST request with a JSON payload.

- `routeParam`: API route path
- `data`: JSON-serializable body
- `headers`: Optional headers
- `controller`: Optional AbortController

#### `putAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a PUT request with a JSON payload.

#### `patchAsync(routeParam: string, data: any, headers?: object, controller?: AbortController): Promise<any>`

Sends a PATCH request with a JSON payload.

#### `deleteAsync(routeParam: string, headers?: object, controller?: AbortController): Promise<any>`

Sends a DELETE request to the specified route.

## Installation

```bash
npm install @bishal-shrestha/rest-client
```

## Browser Usage
This package is primarily designed for Node.js and modern bundler environments. For use in browser environments, please consider the following:

### Using with Bundlers (Recommended)
If your project uses bundlers like Vite, Webpack, Rollup, or similar tools, you can import the package using its npm name:
```ts
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN'
});
```

Your bundler will resolve the package from node_modules, process it according to your configuration, and bundle it appropriately for browser compatibility.

### Using Native ES Modules in Browsers Without Bundlers
Browsers do not natively resolve bare module specifiers like @bishal-shrestha/rest-client. To use the package directly as a module in browsers without a bundler, import it from an ESM CDN such as esm.sh:

```ts
import RestClient from 'https://esm.sh/@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN'
});
```

Then include your script in your HTML with the `type="module"` attribute:
```html
<script type="module" src="main.js"></script>
```

This approach allows native ES module support while letting the CDN handle package resolution and transformation.

### Notes
- When using ESM CDNs, ensure that the package version is compatible and check the CDN documentation for additional configuration options.
- For production applications, bundling remains the preferred approach for performance and caching benefits.

## Basic Usage
```ts
import RestClient, { RestClientOptions } from '@bishal-shrestha/rest-client';

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
const { RestClient, RestClientOptions } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN'
}, new RestClientOptions({ timeout: 5000 }));
```

## Advanced Usage with Configuration Options (Retry Policy and Lifecycle Hooks) 
### Retry Policy
The library includes a default retry policy that retries on HTTP status codes 502, 503, and 504. You can override this behavior with a custom function:

```ts
import RestClient, { RestClientOptions, shouldRetry } from '@bishal-shrestha/rest-client';

const options = new RestClientOptions({
  maxRetries: 3,
  shouldRetry: (response) => {
    // Retry on network errors or specific status codes
    return shouldRetry(response) || response.status === 429;
  }

  const client = new RestClient('https://api.example.com', {}, options);
});
```

### Request Lifecycle Hooks
Hooks allow you to monitor and log request behavior:

```ts
import RestClient, { RestClientOptions } from '@bishal-shrestha/rest-client';

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

const client = new RestClient('https://api.example.com', {}, options);
``` 

## Response Handling
- JSON responses are automatically parsed when the Content-Type is application/json
- Plain text responses are returned as strings
- 204 No Content responses return null

## Examples and Demo

You can find example usage and demos in the [examples](https://github.com/shrestha-bishal/rest-client-js/tree/master/examples) folder of the repository.


## Troubleshooting / FAQ
**Q:** I get a module resolution error when importing in the browser.  
**A:** Browsers do not natively resolve bare module specifiers (like `@bishal-shrestha/rest-client`). Use a bundler or import via an ESM CDN like [esm.sh](https://esm.sh).
```ts
import RestClient from 'https://esm.sh/@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com');
const response = await client.getAsync('users');
```

**Q:** How can I use this library in a TypeScript project?  
**A:** The package includes full TypeScript typings. Simply install via npm and import as usual.

**Q:** How do I handle CORS errors?  
**A:** Ensure the API server includes appropriate CORS headers to allow requests from your origin.

**Q:** Why do I get a syntax error like `Cannot use import statement outside a module`?  
**A:** This happens if your environment does not treat your JavaScript file as an ES module. Make sure to:

- Add `"type": "module"` in your `package.json`, **or**  
- Use the `.mjs` file extension for your scripts, **or**  
- Use a bundler (Webpack, Vite, etc.) that supports ES modules.

Example `package.json` snippet:

```json
{
  "type": "module"
}
```

**Q:** Can I use this library in older browsers like Internet Explorer?
**A:** No, this library depends on modern browser features such as the Fetch API and native ES modules. For older browsers, you must add polyfills and transpile your code using tools like Babel.

**Q:** How can I configure timeout or retry behavior?
**A:** When creating the client, use RestClientOptions to customize these settings. For example:
```ts
import RestClient, { RestClientOptions } from '@bishal-shrestha/rest-client';

const options = new RestClientOptions({
  timeout: 10000,      // timeout in milliseconds
  maxRetries: 5        // number of retry attempts
});

const client = new RestClient('https://api.example.com', {}, options);
```

**Q:** How do I abort a request?
**A:** Pass an AbortController signal to the request method and call abort() to cancel. Example:

```ts
const controller = new AbortController();

setTimeout(() => controller.abort(), 5000);  // abort after 5 seconds

await client.getAsync('/endpoint', {}, {}, controller.signal);
```

**Q:** Can I use this library with React, Vue, or other frontend frameworks?
**A:** Yes. In React or Vue projects, import the package normally and use a bundler to handle module resolution. For example, in a React component:
```ts
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com');

useEffect(() => {
  client.getAsync('/data').then(console.log);
}, []);
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Make your changes and commit them with clear messages.
4. Run tests to ensure nothing is broken.
5. Submit a pull request explaining your changes.

For bug reports or feature requests, please open an issue on GitHub.

## License

This project is licensed under the [MIT License](./LICENSE).

© 2025 Bishal Shrestha, All rights reserved
[![npm](https://img.shields.io/badge/npm-View%20Package-red?logo=npm&logoColor=white&style=flat-square)](https://www.npmjs.com/package/@bishal-shrestha/rest-client)

![4da5c29c-7f0b-4cae-a28f-0152aa645567](https://github.com/user-attachments/assets/0aa91be4-9c89-45da-9087-c2c9acf74094)
