/**
 * Example: GET request with query parameters (CJS)
 * Fetch resources with query string parameters.
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com');

async function run() {
  try {
    const queryParams = { limit: 5, active: true };
    const users = await client.getAsync('users', queryParams);
    console.log('Users with query:', users);
  } catch (error) {
    console.error('GET with query failed:', error);
  }
}

run();