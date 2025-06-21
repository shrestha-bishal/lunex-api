/**
 * Example: Handling request timeouts (TypeScript)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {}, {
  timeout: 3000, // 3 seconds
});

async function run(): Promise<void> {
  try {
    const data: any = await client.getAsync('slow-endpoint');
    console.log('Data:', data);
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('timed out')) {
      console.error('Request timed out:', error);
    } else {
      console.error('Request failed:', error);
    }
  }
}

run();
