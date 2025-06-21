/**
 * Example: Simple GET request with RestClient (TypeScript)
 * Fetch a list of resources without query parameters.
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {
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