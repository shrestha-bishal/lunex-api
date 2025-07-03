/**
 * Example: Simple GET request with RestClient (CJS)
 * Fetch a list of resources without query parameters.
 */
const { RestClient } = require('lunex-http');

const client = new RestClient('https://api.example.com', {
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