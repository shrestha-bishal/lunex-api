/**
 * Example: PATCH request to partially update a resource (TypeScript)
 */
import RestClient from '@bishal-shrestha/rest-client';

interface UserPatch {
  email?: string;
}

const client = new RestClient('https://api.example.com');

async function run(): Promise<void> {
  try {
    const patchData: UserPatch = {
      email: "new.email@example.com",
    };

    const response: any = await client.patchAsync('users/1', patchData);
    console.log('Patched user:', response);
  } catch (error: unknown) {
    console.error('PATCH request failed:', error);
  }
}

run();
