/**
 * Example: DELETE request to remove a resource (CJS)
 */
const { RestClient } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com');

async function run() {
  try {
    await client.deleteAsync('users/1');
    console.log('User deleted successfully');
  } catch (error) {
    console.error('DELETE request failed:', error);
  }
}

run();