/**
 * Main entry point for the Rest Client library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 *
 * @module lunex-http
 */
import LunexClient from './rest/LunexClient';
export { shouldRetry } from './policies/retry-policy';
export { default as LunexClient } from './rest/LunexClient';
export { default as LunexClientOptions } from './rest/LunexClientOptions';
export default LunexClient;
