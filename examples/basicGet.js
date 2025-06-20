/**
 * Example: Basic GET request with query parameters
 * 
 * Demonstrates how to create a RestClient instance and perform a simple GET request
 * with query parameters to fetch filtered data from an API.
 * 
 * URL used: https://api.example.com/resources?q=active
 */

import RestClient from 'rest-client-js';

async function run() {
  const client = new RestClient('https://api.example.com');

  try {
    const data = await client.getAsync('resources', { filter: 'active' });
    console.log('Active resources:', data);
  } catch (err) {
    console.error('Error fetching resources:', err);
  }
}

run();
