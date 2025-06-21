/**
 * Main entry point for the Rest Client library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 *
 * @module rest-client
 */
export { shouldRetry } from './policies/retryPolicy';
export { default as RestClient } from './rest/RestClient';
export { default as RestClientOptions } from './rest/RestClientOptions';
