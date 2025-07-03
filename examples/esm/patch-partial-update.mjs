/**
 * Example: PATCH request to partially update a resource (ESM)
 */
import LunexClient from 'lunex-http';

const client = new LunexClient('https://api.example.com');

async function run() {
  try {
    const patchData = {
      email: "new.email@example.com",
    };

    const response = await client.patchAsync('users/1', patchData);
    console.log('Patched user:', response);
  } catch (error) {
    console.error('PATCH request failed:', error);
  }
}

run();