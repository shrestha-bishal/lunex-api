(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LunexClient = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * Constructs full URL by appending route to base.
     * @param baseUrl - The base URL string.
     * @param routeParam - The route path or full URL.
     * @returns The full URL string.
     */
    function buildUrl(baseUrl, routeParam) {
        if (!routeParam)
            return baseUrl;
        if (/^https?:\/\//i.test(routeParam))
            return routeParam;
        return `${baseUrl}/${routeParam.replace(/^\/+/, '')}`;
    }
    /**
     * Append query parameters to a route string.
     * @param {string|null} routeParam
     * @param {Object} queryParams - Key-value pairs.
     * @returns {string} routeParam with query string
     */
    function appendQueryParams(routeParam = '', queryParams = {}) {
        const baseRoute = routeParam || '';
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParams)) {
            // Only append values that are not null or undefined
            if (value !== undefined && value !== null) {
                // Convert boolean and number to string
                params.append(key, String(value));
            }
        }
        if ([...params].length === 0)
            return baseRoute;
        // Append '?' or '&' depending on if baseRoute already has query params
        const separator = baseRoute.includes('?') ? '&' : '?';
        return `${baseRoute}${separator}${params.toString()}`;
    }

    /**
     * Delay helper for retry logic.
     * @param ms - Milliseconds to delay.
     * @returns A promise that resolves after the specified delay.
     */
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    /**
     * Calculate exponential backoff delay in milliseconds.
     * @param {number} retryCount - Current retry attempt (0-based).
     * @returns {number} Delay in ms.
     */
    function exponentialBackoff(retryCount) {
        // Example: 500ms * 2^retryCount, max 8s
        return Math.min(8000, 500 * 2 ** retryCount);
    }

    /**
     * Default retry condition for transient errors.
     * @param response - Fetch API response object
     * @returns Whether the request should be retried
     */
    function shouldRetry(response) {
        return [502, 503, 504].includes(response.status);
    }

    /**
     * Configuration options for the LunexClient.
     *
     * Enables customization of:
     * - Request timeout duration (in milliseconds).
     * - Number of retry attempts on transient errors.
     * - Retry decision logic based on the response.
     * - Lifecycle hooks to tap into request start, completion, and error events.
     */
    class LunexClientOptions {
        /**
         * Creates an instance of LunexClientOptions.
         *
         * @param {Object} [config={}] Configuration options.
         * @param {number} [config.timeout=10000] Timeout in milliseconds.
         * @param {number} [config.maxRetries=0] Number of retries on transient errors.
         * @param {ShouldRetryFn} [config.shouldRetry] Retry decision function.
         * @param {DelayFn} [config.delayFn] Custom async delay function for retry backoff.
         * @param {OnRequestStartFn|null} [config.onRequestStart] Hook before request start.
         * @param {OnRequestEndFn|null} [config.onRequestEnd] Hook after request end.
         * @param {OnRequestErrorFn|null} [config.onRequestError] Hook on request error.
         */
        constructor({ timeout = 10000, maxRetries = 0, shouldRetry: shouldRetry$1 = shouldRetry, delayFn = delay, onRequestStart = null, onRequestEnd = null, onRequestError = null } = {}) {
            this.timeout = timeout;
            this.maxRetries = maxRetries;
            this.shouldRetry = shouldRetry$1;
            this.delayFn = delayFn;
            this.onRequestStart = onRequestStart;
            this.onRequestEnd = onRequestEnd;
            this.onRequestError = onRequestError;
        }
    }

    var _LunexClient_instances, _LunexClient_request;
    /**
     * LunexClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
     * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
     * Allows custom headers including Authorization and API keys.
     * Supports request timeout and optional retry for transient errors.
     */
    class LunexClient {
        /**
         * Creates an instance of LunexClient.
         *
         * @param baseUrl - The base URL for all API requests (e.g., "https://api.example.com").
         * @param defaultHeaders - Default HTTP headers to include with every request.
         * @param options - Configuration options for request behavior such as timeout, retries, and hooks.
         */
        constructor(baseUrl, defaultHeaders = {}, options = new LunexClientOptions()) {
            _LunexClient_instances.add(this);
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
            this.delayFn = options.delayFn ?? (ms => new Promise(resolve => setTimeout(resolve, ms)));
            // Logging hooks
            this.onRequestStart = options.onRequestStart;
            this.onRequestEnd = options.onRequestEnd;
            this.onRequestError = options.onRequestError;
        }
        /**
         * Update default headers (e.g., to set Authorization or API key).
         * @param headers - Headers to merge with existing defaults.
         */
        setHeaders(headers) {
            this.defaultHeaders = { ...this.defaultHeaders, ...headers };
        }
        /**
         * Send a GET request.
         * @param routeParam - Optional route to append to the base URL.
         * @param {Object} [queryParams={}] - Optional query parameters as key-value pairs.
         * @param {Object} [headers={}] - Optional headers.
         * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
         * @returns {Promise<Object|string|null>}
         */
        async getAsync(routeParam = null, queryParams = {}, headers = {}, controller = null) {
            const urlWithQuery = appendQueryParams(routeParam, queryParams);
            return await __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, "GET", urlWithQuery, null, headers, 0, controller);
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
            return __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, "POST", routeParam, data, headers, 0, controller);
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
            return __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, "PUT", routeParam, data, headers, 0, controller);
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
            return __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, "PATCH", routeParam, data, headers, 0, controller);
        }
        /**
         * Send a DELETE request.
         * @param {string|null} routeParam - Optional route to append to the base URL.
         * @param {Object} [headers={}] - Optional headers.
         * @param {AbortController|null} [controller=null] - Optional controller to cancel the request.
         * @returns {Promise<Object|string|null>}
         */
        async deleteAsync(routeParam = null, headers = {}, controller = null) {
            return __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, "DELETE", routeParam, null, headers, 0, controller);
        }
    }
    _LunexClient_instances = new WeakSet(), _LunexClient_request = 
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
    async function _LunexClient_request(method, routeParam, data, headers, retryCount = 0, externalController = null) {
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
            }
            else if (data instanceof FormData || data instanceof URLSearchParams) {
                options.body = data;
                delete combinedHeaders["Content-Type"];
            }
            else {
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
                if (this.maxRetries > 0 && retryCount < this.maxRetries && this.shouldRetry(response)) {
                    const waitTime = exponentialBackoff(retryCount);
                    await this.delayFn(waitTime);
                    return __classPrivateFieldGet(this, _LunexClient_instances, "m", _LunexClient_request).call(this, method, routeParam, data, headers, retryCount + 1, externalController);
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
            if (response.status === 204)
                return null;
            const contentType = (response.headers.get("content-type") || "").toLowerCase();
            return contentType.includes("application/json") ? await response.json() : await response.text();
        }
        catch (err) {
            this.onRequestError?.(err);
            if (err instanceof Error && err.name === "AbortError") {
                throw new Error(`Request to ${url} timed out after ${this.timeout} ms`);
            }
            if (err instanceof TypeError && err.message.includes("fetch")) {
                throw new Error(`Network error while connecting to ${url}`);
            }
            throw err;
        }
        finally {
            clearTimeout(timeoutId);
        }
    };

    /**
     * Main entry point for the Lunex HTTP library.
     *
     * Exports core classes for API interaction, payload handling, and utility functions.
     *
     * @module lunex-http
     * @author Bishal Shrestha <https://github.com/shrestha-bishal>
     */

    exports.LunexClient = LunexClient;
    exports.LunexClientOptions = LunexClientOptions;
    exports.default = LunexClient;
    exports.shouldRetry = shouldRetry;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lunex-client.umd.js.map
