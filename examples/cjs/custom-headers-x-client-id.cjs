/**
 * Example: Using X-Client-ID header with RestClient
 *
 * Demonstrates how to include a custom X-Client-ID header in all requests.
 * This is useful for client identification in analytics, rate limiting,
 * or custom middleware implementations on the API server.
 */

const { RestClient } = require('lunex-http');

// Initialize the RestClient with the base API URL
const client = new RestClient('https://api.example.com');

// Set the X-Client-ID header globally
client.setHeaders({
  'X-Client-ID': 'client-application-001'
});

(async () => {
  try {
    // Fetch a user with the client identifier header attached
    const user = await client.getAsync('users/1');
    console.log('Fetched user with client ID:', user);
  } catch (error) {
    console.error('Request failed with client ID header:', error);
  }
})();
