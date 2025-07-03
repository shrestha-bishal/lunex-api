/**
 * Example: Uploading a file using FormData with LunexClient
 *
 * Demonstrates how to send multipart/form-data payloads, commonly used for file uploads.
 * Note: Content-Type header should NOT be manually set when sending FormData,
 * as the browser will set the correct boundary automatically.
 */

import LunexClient from 'lunex-http';

// Initialize LunexClient
const client = new LunexClient('https://api.example.com');

(async () => {
  try {
    const form = new FormData();
    // Example file input, in browser environment: file input element or drag/drop
    const file = document.querySelector('input[type="file"]').files[0];
    form.append('file', file);
    form.append('description', 'Sample file upload');

    const response = await client.postAsync('users/upload', form, {
      // Do not set Content-Type here; FormData handles it
    });

    console.log('File uploaded successfully:', response);
  } catch (error) {
    console.error('File upload failed:', error);
  }
})();