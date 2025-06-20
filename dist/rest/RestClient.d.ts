export default RestClient;
/**
 * RestClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
 * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
 * Allows custom headers including Authorization and API keys.
 * Supports request timeout and optional retry for transient errors.
 */
declare class RestClient {
    /**
     * Creates an instance of RestClient.
     *
     * @param {string} baseUrl - The base URL for all API requests (e.g., "https://api.example.com").
     * @param {Object} [defaultHeaders={}] - Default HTTP headers to include with every request.
     * @param {RestClientOptions} [options=new RestClientOptions()] - Configuration options for request behavior such as timeout, retries, and hooks.
     */
    constructor(baseUrl: string, defaultHeaders?: Object, options?: RestClientOptions);
    baseUrl: string;
    defaultHeaders: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        "Content-Type": string;
    };
    timeout: number;
    maxRetries: number;
    shouldRetry: Function;
    onRequestStart: Function | null;
    onRequestEnd: Function | null;
    onRequestError: Function | null;
    /**
     * Update default headers (e.g., to set Authorization or API key).
     * @param {Object} headers - Headers to merge with existing defaults.
     */
    setHeaders(headers: Object): void;
    /**
     * Send a GET request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [queryParams={}] - Optional query parameters as key-value pairs.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    getAsync(routeParam?: string | null, queryParams?: Object, headers?: Object, controller?: AbortController | null): Promise<Object | string | null>;
    /**
     * Send a POST request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    postAsync(routeParam: string | null | undefined, data: Object, headers?: Object, controller?: AbortController | null): Promise<Object | string | null>;
    /**
     * Send a PUT request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    putAsync(routeParam: string | null | undefined, data: Object, headers?: Object, controller?: AbortController | null): Promise<Object | string | null>;
    /**
     * Send a PATCH request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    patchAsync(routeParam: string | null | undefined, data: Object, headers?: Object, controller?: AbortController | null): Promise<Object | string | null>;
    /**
     * Send a DELETE request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    deleteAsync(routeParam?: string | null, headers?: Object, controller?: AbortController | null): Promise<Object | string | null>;
    #private;
}
import RestClientOptions from "./RestClientOptions";
