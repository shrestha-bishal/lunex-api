/**
 * Constructs full URL by appending route to base.
 * @param baseUrl - The base URL string.
 * @param routeParam - The route path or full URL.
 * @returns The full URL string.
 */
export function buildUrl(baseUrl: string, routeParam: string | null) : string  {
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
export function appendQueryParams(
    routeParam: string | null = '', 
    queryParams:Record<string, string | number | boolean | null | undefined>  = {}): string {
    const baseRoute = routeParam || '';
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
        // Only append values that are not null or undefined
        if (value !== undefined && value !== null) {
            // Convert boolean and number to string
            params.append(key, String(value));
        }
    }

    if ([...params].length === 0) return baseRoute;

    // Append '?' or '&' depending on if baseRoute already has query params
    const separator = baseRoute.includes('?') ? '&' : '?';

    return `${baseRoute}${separator}${params.toString()}`;
}