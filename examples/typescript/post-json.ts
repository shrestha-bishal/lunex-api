/**
 * Example: POST request with JSON body (TypeScript)
 */
import LunexClient from 'lunex-http';

interface User {
  name: string;
  email: string;
}

const client = new LunexClient('https://api.example.com');

async function run(): Promise<void> {
  try {
    const newUser: User = {
      name: "John Doe",
      email: "john@example.com",
    };

    const response: any = await client.postAsync('users', newUser);
    console.log('Created user:', response);
  } catch (error: unknown) {
    console.error('POST request failed:', error);
  }
}

run();
