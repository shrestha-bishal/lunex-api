/**
 * Example: Handling plain text response from an API endpoint.
 *
 * This shows how to handle APIs that return plain text instead of JSON.
 */

const { RestClient } = require('lunex-http');

const client = new RestClient('https://api.example.com');

(async () => {
  try {
    const textResponse = await client.getAsync('users/1/profile-text');
    console.log('Plain text response:', textResponse);
  } catch (error) {
    console.error('Failed to fetch plain text response:', error);
  }
})();
