/**
 * Example: Canceling a request using AbortController with RestClient
 *
 * This example shows how to abort an ongoing request manually or handle
 * a request timeout using an AbortController.
 */

const { RestClient } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com');

(async () => {
  const controller = new AbortController();

  // Cancel the request after 2 seconds
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 2000);

  try {
    const data = await client.getAsync('users/slow-response', {}, {}, controller);
    console.log('Received data:', data);
  } catch (error) {
    if (error.message.includes('timed out') || error.name === 'AbortError') {
      console.error('Request was aborted due to timeout or manual cancel.');
    } else {
      console.error('Request failed:', error);
    }
  } finally {
    clearTimeout(timeoutId);
  }
})();
