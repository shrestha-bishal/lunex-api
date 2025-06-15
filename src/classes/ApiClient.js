/**
 * ApiClient provides a clean abstraction to interact with RESTful APIs using HTTP methods.
 * Supports GET, POST, PUT, DELETE, PATCH with JSON and text response handling.
 * Allows custom headers including Authorization and API keys.
 * Supports request timeout and optional retry for transient errors.
 */
class ApiClient 
{
    /**
     * Creates an instance of ApiClient.
     * @param {string} baseUrl - The base URL of the API (e.g., "https://api.example.com").
     * @param {Object} [defaultHeaders={}] - Optional default headers (e.g., Authorization).
     * @param {Object} [options={}] - Optional config options.
     * @param {number} [options.timeout=10000] - Request timeout in milliseconds (default 10s).
     * @param {number} [options.maxRetries=0] - Number of retries on transient errors (default none).
     */
    constructor(baseUrl, defaultHeaders = {}, options = {}) {
        if (!baseUrl || typeof baseUrl !== "string") {
            throw new TypeError("Base URL must be a non-empty string");
        }

        this.baseUrl = baseUrl.replace(/\/+$/, "");
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders,
        };

        this.timeout = typeof options.timeout === "number" ? options.timeout : 10000;
        this.maxRetries = typeof options.maxRetries === "number" ? options.maxRetries : 0;
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
     * @returns {Promise<Object|string|null>}
     */
    async getAsync(routeParam = null, queryParams = {}, headers = {}) {
        const urlWithQuery = this.#appendQueryParams(routeParam, queryParams);
        return this.#request("GET", urlWithQuery, null, headers);
    }

    /**
     * Send a POST request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @returns {Promise<Object|string|null>}
     */
    async postAsync(routeParam = null, data, headers = {}) {
        return this.#request("POST", routeParam, data, headers);
    }

    /**
     * Send a PUT request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @returns {Promise<Object|string|null>}
     */
    async putAsync(routeParam = null, data, headers = {}) {
        return this.#request("PUT", routeParam, data, headers);
    }

    /**
     * Send a PATCH request with JSON body.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} data - JSON data to send in the request body.
     * @param {Object} [headers={}] - Optional headers.
     * @returns {Promise<Object|string|null>}
     */
    async patchAsync(routeParam = null, data, headers = {}) {
        return this.#request("PATCH", routeParam, data, headers);
    }

    /**
     * Send a DELETE request.
     * @param {string|null} routeParam - Optional route to append to the base URL.
     * @param {Object} [headers={}] - Optional headers.
     * @returns {Promise<Object|string|null>}
     */
    async deleteAsync(routeParam = null, headers = {}) {
        return this.#request("DELETE", routeParam, null, headers);
    }
    
    /**
     * Internal request method using fetch API with timeout and retry.
     * @private
     * @param {string} method - HTTP method.
     * @param {string|null} routeParam - Endpoint path or full URL with query.
     * @param {Object|null} data - Optional JSON body data.
     * @param {Object} headers - Additional per-request headers.
     * @param {number} [retryCount=0] - Current retry attempt.
     * @returns {Promise<Object|string|null>}
     */
    async #request(method, routeParam = null, data = null, headers = {}, retryCount = 0) {
        const url = this.#buildUrl(routeParam);
        const combinedHeaders = { ...this.defaultHeaders, ...headers };

        // Allow overriding Content-Type (default is application/json)
        const contentTypeKey = Object.keys(combinedHeaders).find((key) => key.toLowerCase() === "content-type");
        const contentType = contentTypeKey ? combinedHeaders[contentTypeKey] : "application/json";

        const options = {
            method,
            headers: combinedHeaders,
        };

        if (data !== null && method !== "GET" && method !== "HEAD") {
            // If content-type is application/json, stringify body else for other content-types (like form-data), pass data as is (user responsibility)
            options.body = contentType.includes("application/json") ? JSON.stringify(data) : options.body = data;
        }

        // Setup timeout with AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        options.signal = controller.signal;

        try {
            const response = await fetch(url, options);
            clearTimeout(timeoutId);

            if (!response.ok) {
                // Retry on transient errors (e.g., 502, 503, 504) if maxRetries > 0
                if (this.maxRetries > 0 && retryCount < this.maxRetries && [502, 503, 504].includes(response.status)) 
                {
                    const delay = this.#exponentialBackoff(retryCount);
                    await this.#delay(delay);

                    return this.#request(method, routeParam, data, headers, retryCount + 1);
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

            const responseContentType = (response.headers.get("content-type") || "").toLowerCase();

            if (responseContentType.includes("application/json")) {
                return await response.json();
            }

            return await response.text();
        } catch (err) {
            clearTimeout(timeoutId);

            if (err.name === "AbortError") {
                throw new Error(`Request to ${url} timed out after ${this.timeout} ms`);
            }

            if (err instanceof TypeError && err.message.includes("fetch")) {
                throw new Error(`Network error while connecting to ${url}`);
            }

            throw err;
        }
    }
    
    /**
     * Constructs the full URL by appending the route path to the base URL.
     * @private
     * @param {string|null} routeParam - Optional endpoint path.
     * @returns {string}
     */
    #buildUrl(routeParam) {
        if (!routeParam) return this.baseUrl;
        if (/^https?:\/\//i.test(routeParam)) return routeParam; // full URL provided
        return `${this.baseUrl}/${routeParam.replace(/^\/+/, "")}`;
    }

    /**
     * Append query parameters to a route string.
     * @private
     * @param {string|null} routeParam
     * @param {Object} queryParams - Key-value pairs.
     * @returns {string} routeParam with query string
     */
    #appendQueryParams(routeParam, queryParams) {
        const baseRoute = routeParam || "";
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined && value !== null) {
                params.append(key, value);
            }
        }

        if ([...params].length === 0) return baseRoute;

        // Append '?' or '&' depending on if baseRoute already has query params
        const separator = baseRoute.includes("?") ? "&" : "?";

        return `${baseRoute}${separator}${params.toString()}`;
    }

    /**
     * Delay helper for retry logic.
     * @private
     * @param {number} ms - Milliseconds to delay.
     * @returns {Promise<void>}
     */
    #delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Calculate exponential backoff delay in milliseconds.
     * @private
     * @param {number} retryCount - Current retry attempt (0-based).
     * @returns {number} Delay in ms.
     */
    #exponentialBackoff(retryCount) {
        // Example: 500ms * 2^retryCount, max 8s
        return Math.min(8000, 500 * 2 ** retryCount);
    }
}

export default ApiClient;