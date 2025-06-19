/**
 * Delay helper for retry logic.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise<void>}
 */
export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay in milliseconds.
 * @param {number} retryCount - Current retry attempt (0-based).
 * @returns {number} Delay in ms.
 */
export function exponentialBackoff(retryCount) {
    // Example: 500ms * 2^retryCount, max 8s
    return Math.min(8000, 500 * 2 ** retryCount);
}