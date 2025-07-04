/**
 * Example: Using X-API-Key header with LunexClient
 *
 * Demonstrates how to authenticate requests using an `X-API-Key` header.
 * This is commonly used in APIs that require simple token-based access.
 */

const { LunexClient } = require('lunex-http');

// Initialize the client with the base URL of the API
const client = new LunexClient('https://api.example.com');

// Apply X-API-Key globally to all requests
client.setHeaders({
  'X-API-Key': 'your-secure-api-key-here'
});

(async () => {
  try {
    // Send a GET request to retrieve a user
    const user = await client.getAsync('users/1');
    console.log('Fetched user with API key:', user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
})();
