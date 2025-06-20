import { buildUrl, appendQueryParams } from "../utils/urlUtils";
import { delay, exponentialBackoff } from "../utils/delayUtils";
import { RestClientOptions } from "..";

/**
 * RestClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
 * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
 * Allows custom headers including Authorization and API keys.
 * Supports request timeout and optional retry for transient errors.
 */
class RestClient 
{
    /**
     * Creates an instance of RestClient.
     * 
     * @param {string} baseUrl - The base URL for all API requests (e.g., "https://api.example.com").
     * @param {Object} [defaultHeaders={}] - Default HTTP headers to include with every request.
     * @param {RestClientOptions} [options=new RestClientOptions()] - Configuration options for request behavior such as timeout, retries, and hooks.
     */
    constructor(baseUrl, defaultHeaders = {}, options = new RestClientOptions()) {
        if (!baseUrl || typeof baseUrl !== "string") {
            throw new TypeError("Base URL must be a non-empty string");
        }

        this.baseUrl = baseUrl.replace(/\/+$/, "");
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders,
        };

        this.timeout = options.timeout ?? 10000;
        this.maxRetries = options.maxRetries ?? 0;
        this.shouldRetry = options.shouldRetry || ((res) => [502, 503, 504].includes(res.status));

        // Logging hooks
        this.onRequestStart = options.onRequestStart;
        this.onRequestEnd = options.onRequestEnd;
        this.onRequestError = options.onRequestError;
    }

    /**
     * Update default headers (e.g., to set Authorization or API key).
     * @param {Object} headers - Headers to merge with existing defaults.
     */
    setHeaders(headers) {
        this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }

    /**
     * Send a GET request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [queryParams={}] - Optional query parameters as key-value pairs.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async getAsync(routeParam = null, queryParams = {}, headers = {}, controller = null) {
        const urlWithQuery = appendQueryParams(routeParam, queryParams);
        return await this.#request("GET", urlWithQuery, null, headers, 0, controller);
    }  

    /**
     * Send a POST request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async postAsync(routeParam = null, data, headers = {}, controller = null) {
        return await this.#request("POST", routeParam, data, headers, 0, controller);
    }

    /**
     * Send a PUT request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async putAsync(routeParam = null, data, headers = {}, controller = null) {
        return await this.#request("PUT", routeParam, data, headers, 0, controller);
    }

    /**
     * Send a PATCH request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async patchAsync(routeParam = null, data, headers = {}, controller = null) {
        return await this.#request("PATCH", routeParam, data, headers, 0, controller);
    }

    /**
     * Send a DELETE request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [headers={}] - Optional headers.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async deleteAsync(routeParam = null, headers = {}, controller = null) {
        return await this.#request("DELETE", routeParam, null, headers, 0, controller);
    }
    
    /**
     * Internal request method using fetch API with timeout and retry.
     * @private
     * @param {string} method - HTTP method.
     * @param {string|null} routeParam - Endpoint path or full URL with query.
     * @param {Object|null} data - Optional JSON body data.
     * @param {Object} headers - Additional per-request headers.
     * @param {number} [retryCount=0] - Current retry attempt.
     * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
     * @returns {Promise<Object|string|null>}
     */
    async #request(method, routeParam, data, headers, retryCount = 0, externalController = null) {
        const url = buildUrl(this.baseUrl, routeParam);
        const combinedHeaders = { ...this.defaultHeaders, ...headers };

        // Allow overriding Content-Type (default is application/json)
        const contentTypeKey = Object.keys(combinedHeaders).find((key) => key.toLowerCase() === "content-type");
        const contentType = contentTypeKey ? combinedHeaders[contentTypeKey] : "application/json";

        const options = {
            method,
            headers: combinedHeaders,
        };

        // Handle request body
        if (data !== null && method !== "GET" && method !== "HEAD") {
            if (contentType.includes("application/json")) {
                options.body = JSON.stringify(data);
            } else if (data instanceof FormData || data instanceof URLSearchParams) {
                options.body = data;
                delete combinedHeaders["Content-Type"]; // Let browser set it
            } else {
                options.body = data;
            }
        }

        // Setup timeout with AbortController
        const controller = externalController || new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        options.signal = controller.signal;

        this.onRequestStart?.(method, url, options);

        try {
            const response = await fetch(url, options);

            // Call onRequestEnd hook after response received
            this.onRequestEnd?.(response);

            if (!response.ok) {
                // Retry on transient errors (e.g., 502, 503, 504) if maxRetries > 0
                if (this.maxRetries > 0 && retryCount < this.maxRetries && this.shouldRetry(response)) 
                {
                    const waitTime = exponentialBackoff(retryCount);
                    await delay(waitTime);

                    return this.#request(method, routeParam, data, headers, retryCount + 1, externalController);
                }

                const errorText = `HTTP ${response.status} - ${response.statusText}`;
                const responseContentType = (response.headers.get("content-type") || "").toLowerCase();

                const errorBody = responseContentType.includes("application/json")
                    ? await response.json()
                    : await response.text();

                const error = new Error(errorText);
                error.status = response.status;
                error.details = errorBody;

                throw error;
            }

            if (response.status === 204) return null;

            const contentType = (response.headers.get("content-type") || "").toLowerCase();
            return contentType.includes("application/json") ? await response.json() : await response.text();
        } catch (err) {
            this.onRequestError?.(err);
            
            if (err.name === "AbortError") {
                throw new Error(`Request to ${url} timed out after ${this.timeout} ms`);
            }

            if (err instanceof TypeError && err.message.includes("fetch")) {
                throw new Error(`Network error while connecting to ${url}`);
            }

            throw err;
        }finally {
            clearTimeout(timeoutId);
        }
    }
}

export default RestClient;