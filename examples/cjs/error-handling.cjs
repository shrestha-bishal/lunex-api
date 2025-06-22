/**
 * Example: Graceful error handling with RestClient
 *
 * Shows how to catch errors, access HTTP status codes, and read error details
 * returned from the API in the error's `details` property.
 */

const { RestClient } = require('@bishal-shrestha/rest-client');

const client = new RestClient('https://api.example.com');

(async () => {
  try {
    // Attempt to get a user that might not exist to trigger an error
    const user = await client.getAsync('users/999999');
    console.log('User data:', user);
  } catch (error) {
    console.error(`Request failed with status ${error.status || 'unknown'}`);

    if (error.details) {
      console.error('Error details:', error.details);
    } else {
      console.error('No additional error details provided.');
    }
  }
})();
