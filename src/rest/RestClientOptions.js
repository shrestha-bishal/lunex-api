import { shouldRetry as defaultShouldRetry } from "../policies/retryPolicy";

/**
 * Configuration options for the RestClient.
 * 
 * Allows customization of request timeout, retry behavior, and logging hooks.
 */
class RestClientOptions {
    /**
     * Creates an instance of RestClientOptions.
     * 
     * @param {Object} [config={}] - Configuration object.
     * @param {number} [config.timeout=10000] - Request timeout in milliseconds.
     * @param {number} [config.maxRetries=0] - Maximum number of retry attempts on transient errors.
     * @param {function} [config.shouldRetry] - Function to determine if a retry should occur based on the response.
     *   Receives the response object and returns a boolean. Defaults to retry on HTTP 502, 503, and 504.
     * @param {function|null} [config.onRequestStart] - Optional hook called before a request is sent.
     *   Receives (method, url, options).
     * @param {function|null} [config.onRequestEnd] - Optional hook called after a response is received.
     *   Receives the response object.
     * @param {function|null} [config.onRequestError] - Optional hook called if a request error occurs.
     *   Receives the error object.
     */
    constructor({
        timeout = 10000,
        maxRetries = 0,
        shouldRetry = defaultShouldRetry,
        onRequestStart = null,
        onRequestEnd = null,
        onRequestError = null
    } = {}) {
        /** @type {number} */
        this.timeout = timeout;
        /** @type {number} */
        this.maxRetries = maxRetries;
        /** @type {function} */
        this.shouldRetry = shouldRetry;
        /** @type {function|null} */
        this.onRequestStart = onRequestStart;
        /** @type {function|null} */
        this.onRequestEnd = onRequestEnd;
        /** @type {function|null} */
        this.onRequestError = onRequestError;
    }
}

export default RestClientOptions;