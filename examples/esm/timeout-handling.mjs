/**
 * Example: Handling request timeouts (ESM)
 */
import RestClient from '@bishal-shrestha/rest-client';

const client = new RestClient('https://api.example.com', {}, {
  timeout: 3000, // 3 seconds
});

async function run() {
  try {
    const data = await client.getAsync('slow-endpoint');
    console.log('Data:', data);
  } catch (error) {
    if (error.message.includes('timed out')) {
      console.error('Request timed out:', error);
    } else {
      console.error('Request failed:', error);
    }
  }
}

run();