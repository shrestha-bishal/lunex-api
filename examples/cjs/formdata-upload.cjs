/**
 * Example: Uploading a file using FormData with RestClient
 *
 * Demonstrates how to send multipart/form-data payloads, commonly used for file uploads.
 * Note: Content-Type header should NOT be manually set when sending FormData,
 * as the browser will set the correct boundary automatically.
 */

const { RestClient } = require('lunex-http');
const fs = require('fs');
const path = require('path');

// Node environment requires polyfill or alternative to FormData
const FormData = require('form-data');

// Initialize RestClient
const client = new RestClient('https://api.example.com');

(async () => {
  try {
    const form = new FormData();
    const filePath = path.resolve(__dirname, 'example-file.txt');
    form.append('file', fs.createReadStream(filePath));
    form.append('description', 'Sample file upload');

    const response = await client.postAsync('users/upload', form, {
      // Do not set Content-Type here; FormData handles it
    });

    console.log('File uploaded successfully:', response);
  } catch (error) {
    console.error('File upload failed:', error);
  }
})();
