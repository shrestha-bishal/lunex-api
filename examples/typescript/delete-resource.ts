/**
 * Example: DELETE request to remove a resource (TypeScript)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com');

async function run(): Promise<void> {
  try {
    await client.deleteAsync('users/1');
    console.log('User deleted successfully');
  } catch (error: unknown) {
    console.error('DELETE request failed:', error);
  }
}

run();
