/**
 * Main entry point for the API client JS library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 * 
 * @module api-client-js
 */

export { shouldRetry } from './policies/retryPolicy'
export { default as RestClient } from './rest/RestClient'
export { default as RestClientOptions } from './rest/RestClientOptions'