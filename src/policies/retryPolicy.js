/**
 * Default retry condition for transient errors.
 * @param {Response} response 
 * @returns {boolean}
 */
export function shouldRetry(response) {
  return [502, 503, 504].includes(response.status);
}