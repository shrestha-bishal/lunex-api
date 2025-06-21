/**
 * Default retry condition for transient errors.
 * @param response - Fetch API response object
 * @returns Whether the request should be retried
 */
export declare function shouldRetry(response: Response): boolean;
