/**
 * Main entry point for the Rest Client library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 * 
 * @module lunex-http
 * @author Bishal Shrestha <https://github.com/shrestha-bishal>
 */
import RestClient from './rest/LunexClient'

export { shouldRetry } from './policies/retry-policy'
export { default as RestClient } from './rest/LunexClient'
export { default as LunexClientOptions } from './rest/LunexClientOptions'

export default RestClient;
