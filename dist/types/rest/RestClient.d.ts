import LunexClientOptions from "./LunexClientOptions";
type Headers = Record<string, string>;
type QueryParams = Record<string, string | number | boolean | undefined | null>;
/**
 * LunexClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
 * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
 * Allows custom headers including Authorization and API keys.
 * Supports request timeout and optional retry for transient errors.
 */
export declare class LunexClient {
    #private;
    private baseUrl;
    private defaultHeaders;
    private timeout;
    private maxRetries;
    private shouldRetry;
    private delayFn;
    private onRequestStart?;
    private onRequestEnd?;
    private onRequestError?;
    /**
     * Creates an instance of LunexClient.
     *
     * @param baseUrl - The base URL for all API requests (e.g., "https://api.example.com").
     * @param defaultHeaders - Default HTTP headers to include with every request.
     * @param options - Configuration options for request behavior such as timeout, retries, and hooks.
     */
    constructor(baseUrl: string, defaultHeaders?: Headers, options?: LunexClientOptions);
    /**
     * Update default headers (e.g., to set Authorization or API key).
     * @param headers - Headers to merge with existing defaults.
     */
    setHeaders(headers: Headers): void;
    /**
     * Send a GET request.
     * @param routeParam - Optional route to append to the base URL.
     * @param {Object} [queryParams={}] - Optional query parameters as key-value pairs.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    getAsync(routeParam?: string | null, queryParams?: QueryParams, headers?: Headers, controller?: AbortController | null): Promise<any>;
    /**
     * Send a POST request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    postAsync(routeParam: string | null | undefined, data: any, headers?: Headers, controller?: AbortController | null): Promise<any>;
    /**
     * Send a PUT request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    putAsync(routeParam: string | null | undefined, data: any, headers?: Headers, controller?: AbortController | null): Promise<any>;
    /**
     * Send a PATCH request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    patchAsync(routeParam: string | null | undefined, data: any, headers?: Headers, controller?: AbortController | null): Promise<any>;
    /**
     * Send a DELETE request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    deleteAsync(routeParam?: string | null, headers?: Headers, controller?: AbortController | null): Promise<any>;
}
export default LunexClient;
