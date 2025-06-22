"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldRetry = shouldRetry;
/**
 * Default retry condition for transient errors.
 * @param response - Fetch API response object 
 * @returns Whether the request should be retried
 */
function shouldRetry(response) {
  return [502, 503, 504].includes(response.status);
}