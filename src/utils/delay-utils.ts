/**
 * Delay helper for retry logic.
 * @param ms - Milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number) : Promise<void>{
    return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Calculate exponential backoff delay in milliseconds.
 * @param {number} retryCount - Current retry attempt (0-based).
 * @returns {number} Delay in ms.
 */
export function exponentialBackoff(retryCount: number) : number {
    // Example: 500ms * 2^retryCount, max 8s
    return Math.min(8000, 500 * 2 ** retryCount);
}