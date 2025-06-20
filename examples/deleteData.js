/**
 * Example: DELETE request to remove a resource
 * 
 * Demonstrates how to delete a resource by ID.
 * 
 * URL used: https://api.example.com/resources/123
 */

import RestClient from 'rest-client-js';

async function run() {
  const client = new RestClient('https://api.example.com');

  try {
    await client.deleteAsync('resources/123');
    console.log('Deleted resource 123');
  } catch (err) {
    console.error('Error deleting resource:', err);
  }
}

run();
