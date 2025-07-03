/**
 * Example: POST request with JSON body (CJS)
 * Create a new resource.
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com');

async function run() {
  try {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
    };

    const response = await client.postAsync('users', newUser);
    console.log('Created user:', response);
  } catch (error) {
    console.error('POST request failed:', error);
  }
}

run();