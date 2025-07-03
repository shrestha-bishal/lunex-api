/**
 * Main entry point for the Rest Client library.
 *
 * Exports core classes for API interaction, payload handling, and utility functions.
 * 
 * @module lunex-http
 * @author Bishal Shrestha <https://github.com/shrestha-bishal>
 */
import RestClient from './rest/RestClient'

export { shouldRetry } from './policies/retry-policy'
export { default as RestClient } from './rest/RestClient'
export { default as RestClientOptions } from './rest/RestClientOptions'

export default RestClient;
