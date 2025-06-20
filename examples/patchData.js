/**
 * Example: PATCH request to partially update a resource
 * 
 * Shows how to perform a partial update using PATCH.
 * 
 * URL used: https://api.example.com/resources/123
 */

import RestClient from 'rest-client-js';

async function run() {
  const client = new RestClient('https://api.example.com');

  try {
    const patchData = {
      description: 'Patched description only'
    };

    const response = await client.patchAsync('resources/123', patchData);
    console.log('Patched resource:', response);
  } catch (err) {
    console.error('Error patching resource:', err);
  }
}

run();
