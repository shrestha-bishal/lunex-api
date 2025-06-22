/**
 * Default retry condition for transient errors.
 * @param response - Fetch API response object 
 * @returns Whether the request should be retried
 */
export function shouldRetry(response) {
  return [502, 503, 504].includes(response.status);
}