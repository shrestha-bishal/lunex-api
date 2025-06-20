/**
 * Example: POST request to create a new resource
 * 
 * Shows how to send JSON data in a POST request to create a new resource
 * on the API.
 * 
 * URL used: https://api.example.com/resources
 */

import RestClient from 'rest-client-js';

async function run() {
  const client = new RestClient('https://api.example.com');

  try {
    const newResource = {
      name: 'New Resource',
      description: 'Created via API client'
    };

    const response = await client.postAsync('resources', newResource);
    console.log('Created resource:', response);
  } catch (err) {
    console.error('Error creating resource:', err);
  }
}

run();
