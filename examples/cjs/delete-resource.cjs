/**
 * Example: DELETE request to remove a resource (CJS)
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com');

async function run() {
  try {
    await client.deleteAsync('users/1');
    console.log('User deleted successfully');
  } catch (error) {
    console.error('DELETE request failed:', error);
  }
}

run();