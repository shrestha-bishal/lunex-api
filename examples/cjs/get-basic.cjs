/**
 * Example: Simple GET request with LunexClient (CJS)
 * Fetch a list of resources without query parameters.
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN',
});

async function run() {
  try {
    const users = await client.getAsync('users');
    console.log('Users:', users);
  } catch (error) {
    console.error('GET request failed:', error);
  }
}

run();