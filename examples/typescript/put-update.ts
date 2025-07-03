/**
 * Example: PUT request to update a resource (TypeScript)
 */
import RestClient from 'lunex-http';

interface UserUpdate {
  name: string;
  email: string;
}

const client = new RestClient('https://api.example.com');

async function run(): Promise<void> {
  try {
    const updatedUser: UserUpdate = {
      name: "John Smith",
      email: "john.smith@example.com",
    };

    const response: any = await client.putAsync('users/1', updatedUser);
    console.log('Updated user:', response);
  } catch (error: unknown) {
    console.error('PUT request failed:', error);
  }
}

run();
