/**
 * Main entry point for the API client JS library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 * 
 * @module api-client-js
 */

export { shouldRetry } from './policies/retryPolicy.ts'
export { default as ApiClient } from './rest/RestClient.js'
export { default as RestClientOptions } from './rest/RestClientOptions.js'