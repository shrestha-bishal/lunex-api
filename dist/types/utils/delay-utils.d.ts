/**
 * Delay helper for retry logic.
 * @param ms - Milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export declare function delay(ms: number): Promise<void>;
/**
 * Calculate exponential backoff delay in milliseconds.
 * @param {number} retryCount - Current retry attempt (0-based).
 * @returns {number} Delay in ms.
 */
export declare function exponentialBackoff(retryCount: number): number;
