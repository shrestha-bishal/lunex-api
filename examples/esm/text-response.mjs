/**
 * Example: Handling plain text response from an API endpoint.
 *
 * This shows how to handle APIs that return plain text instead of JSON.
 */

import LunexClient from 'lunex-http';

const client = new LunexClient('https://api.example.com');

(async () => {
  try {
    // Assuming the endpoint returns plain text content
    const textResponse = await client.getAsync('users/1/profile-text');
    console.log('Plain text response:', textResponse);
  } catch (error) {
    console.error('Failed to fetch plain text response:', error);
  }
})();