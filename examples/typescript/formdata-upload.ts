/**
 * Example: Uploading a file using FormData with RestClient
 *
 * Demonstrates how to send multipart/form-data payloads, commonly used for file uploads.
 * Note: Content-Type header should NOT be manually set when sending FormData,
 * as the browser will set the correct boundary automatically.
 */

import RestClient from 'lunex-http';

// Initialize RestClient
const client = new RestClient('https://api.example.com');

(async () => {
  try {
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    const file = fileInput?.files?.[0];
    
    if (!file)
      return; 
    
    const form = new FormData();
    const response = await client.postAsync('users/upload', form, {
      // Do not set Content-Type here; FormData handles it
    });

    console.log('File uploaded successfully:', response);
  } catch (error) {
    console.error('File upload failed:', error);
  }
})();