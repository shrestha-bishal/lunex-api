/**
 * Constructs full URL by appending route to base.
 * @param {string} baseUrl 
 * @param {string|null} routeParam 
 * @returns {string}
 */
export function buildUrl(baseUrl, routeParam) {
    if (!routeParam) return baseUrl;
    if (/^https?:\/\//i.test(routeParam)) return routeParam;
    return `${baseUrl}/${routeParam.replace(/^\/+/, '')}`;
}

/**
 * Append query parameters to a route string.
 * @param {string|null} routeParam
 * @param {Object} queryParams - Key-value pairs.
 * @returns {string} routeParam with query string
 */
export function appendQueryParams(routeParam = '', queryParams = {}) {
    const baseRoute = routeParam || '';
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
            params.append(key, value);
        }
    }

    if ([...params].length === 0) return baseRoute;

    // Append '?' or '&' depending on if baseRoute already has query params
    const separator = baseRoute.includes('?') ? '&' : '?';

    return `${baseRoute}${separator}${params.toString()}`;
}