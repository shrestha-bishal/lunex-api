/**
 * Constructs full URL by appending route to base.
 * @param baseUrl - The base URL string.
 * @param routeParam - The route path or full URL.
 * @returns The full URL string.
 */
export declare function buildUrl(baseUrl: string, routeParam: string | null): string;
/**
 * Append query parameters to a route string.
 * @param {string|null} routeParam
 * @param {Object} queryParams - Key-value pairs.
 * @returns {string} routeParam with query string
 */
export declare function appendQueryParams(routeParam?: string | null, queryParams?: Record<string, string | number | boolean | null | undefined>): string;
