/**
 * Example: GET request with query parameters (TypeScript)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com');

async function run(): Promise<void> {
  try {
    const queryParams = { limit: 5, active: true };
    const users: any = await client.getAsync('users', queryParams);
    console.log('Users with query:', users);
  } catch (error: unknown) {
    console.error('GET with query failed:', error);
  }
}

run();
