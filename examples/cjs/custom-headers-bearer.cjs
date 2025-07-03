/**
 * Example: Using Bearer token Authorization header with LunexClient
 *
 * Demonstrates how to use the standard Authorization header with a Bearer token
 * for OAuth2 or JWT authentication schemes.
 */

const { LunexClient } = require('lunex-http');

// Initialize the LunexClient instance
const client = new LunexClient('https://api.example.com');

// Set the Authorization header with Bearer token globally
client.setHeaders({
  Authorization: 'Bearer your_access_token_here'
});

(async () => {
  try {
    // Perform a GET request with the Authorization header
    const user = await client.getAsync('users/1');
    console.log('Fetched user with bearer token:', user);
  } catch (error) {
    console.error('Failed to fetch user with bearer token:', error);
  }
})();
