/**
 * Example: Handling request timeouts (CJS)
 */
const { LunexClient } = require('lunex-http');

const client = new LunexClient('https://api.example.com', {}, {
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