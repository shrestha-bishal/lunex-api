"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldRetry = shouldRetry;
/**
 * Default retry condition for transient errors.
 * @param {Response} response 
 * @returns {boolean}
 */
function shouldRetry(response) {
  return [502, 503, 504].includes(response.status);
}