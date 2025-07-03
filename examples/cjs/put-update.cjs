/**
 * Example: PUT request to update a resource (CJS)
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com');

async function run() {
  try {
    const updatedUser = {
      name: "John Smith",
      email: "john.smith@example.com",
    };

    const response = await client.putAsync('users/1', updatedUser);
    console.log('Updated user:', response);
  } catch (error) {
    console.error('PUT request failed:', error);
  }
}

run();