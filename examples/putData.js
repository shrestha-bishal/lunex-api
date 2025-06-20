/**
 * Example: PUT request to update an existing resource
 * 
 * Demonstrates updating an existing resource fully using a PUT request.
 * 
 * URL used: https://api.example.com/resources/123
 */

import RestClient from 'rest-client-js';

async function run() {
  const client = new RestClient('https://api.example.com');

  try {
    const updatedResource = {
      id: 123,
      name: 'Updated Resource Name',
      description: 'Updated description'
    };

    const response = await client.putAsync('resources/123', updatedResource);
    console.log('Updated resource:', response);
  } catch (err) {
    console.error('Error updating resource:', err);
  }
}

run();
