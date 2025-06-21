/**
 * Example: PUT request to update a resource (CJS)
 */
const { RestClient } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com');

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