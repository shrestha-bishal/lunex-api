/**
 * Example: Using lifecycle hooks for request logging with LunexClient
 *
 * Demonstrates how to utilize onRequestStart, onRequestEnd, and onRequestError hooks
 * to log detailed information about HTTP requests and responses.
 */

const { LunexClient, LunexClientOptions } = require('lunex-http');

const options = new LunexClientOptions();
options.onRequestStart = (method, url, options) => {
  console.log(`[Request Start] ${method} ${url}`, options);
};

options.onRequestEnd = (response) => {
  console.log(`[Request End] Status: ${response.status} ${response.statusText}`);
};

options.onRequestError = (error) => {
  console.error(`[Request Error]`, error);
};

const client = new LunexClient('https://api.example.com', {}, options);

(async () => {
  try {
    const user = await client.getAsync('users/1');
    console.log('User data:', user);
  } catch (error) {
    console.error('Request failed:', error);
  }
})();
