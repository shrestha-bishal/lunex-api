/**
 * Example: Simple GET request with LunexClient (TypeScript)
 * Fetch a list of resources without query parameters.
 */
import LunexClient from 'lunex-http';

const client = new LunexClient('https://api.example.com', {
  Authorization: 'Bearer YOUR_TOKEN',
});

async function run(): Promise<void> {
  try {
    const users: any = await client.getAsync('users');
    console.log('Users:', users);
  } catch (error: unknown) {
    console.error('GET request failed:', error);
  }
}

run();