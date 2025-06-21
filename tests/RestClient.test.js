/**
 * @file RestClient.test.js
 * @description Comprehensive Jest test suite for RestClient.js
 */
import { jest } from '@jest/globals';
import { RestClient } from '../dist/esm';

beforeEach(() => {
  fetch.resetMocks();
});

describe('RestClient', () => {
    const baseUrl = 'https://api.example.com';
    let client;

    beforeEach(() => {
        client = new RestClient(baseUrl);
    });

    test('constructs correctly with defaults', () => {
        expect(client.baseUrl).toBe(baseUrl);
        expect(client.timeout).toBe(10000);
        expect(client.maxRetries).toBe(0);
    });

    test('GET request with query parameters', async () => {
        fetch.mockResponseOnce(
          JSON.stringify({ ok: true }),
          { headers: { 'Content-Type': 'application/json' } }
        );

        const result = await client.getAsync('users', { q: 'john' });

        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/users?q=john',
            expect.objectContaining({ method: 'GET' })
        );
        expect(result).toEqual({ ok: true });
    });

    test('POST request with JSON body', async () => {
        fetch.mockResponseOnce(
          JSON.stringify({ created: true }),
          { headers: { 'Content-Type': 'application/json' } }
        );

        const data = { name: 'Jane Doe' };
        const result = await client.postAsync('users', data);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/users',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(data),
                headers: expect.objectContaining({ 'Content-Type': 'application/json' })
            })
        );
        expect(result).toEqual({ created: true });
    });

    test('PUT request sends correct method and body', async () => {
        fetch.mockResponseOnce(
          JSON.stringify({ updated: true }),
          { headers: { 'Content-Type': 'application/json' } }
        );

        const data = { active: false };
        const result = await client.putAsync('users/123', data);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.example.com/users/123',
            expect.objectContaining({ method: 'PUT' })
        );
        expect(result).toEqual({ updated: true });
    });

    test('PATCH request works with JSON data', async () => {
        fetch.mockResponseOnce(
          JSON.stringify({ patched: true }),
          { headers: { 'Content-Type': 'application/json' } }
      );

        const result = await client.patchAsync('users/123', { email: 'new@example.com' });
        expect(result).toEqual({ patched: true });
    });

    test('DELETE request works correctly', async () => {
        fetch.mockResponseOnce('', { status: 204 });
        const result = await client.deleteAsync('users/123');
        expect(result).toBeNull();
    });

    test('handles non-200 HTTP errors with JSON response', async () => {
        fetch.mockResponseOnce(JSON.stringify({ message: 'Not found' }), {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': 'application/json' }
        });

        await expect(client.getAsync('unknown')).rejects.toMatchObject({
            message: 'HTTP 404 - Not Found',
            status: 404,
            details: { message: 'Not found' }
        });
    });

    test('handles plain text error response gracefully', async () => {
        fetch.mockResponseOnce('Error occurred', {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'text/plain' }
        });

        await expect(client.getAsync('fail')).rejects.toMatchObject({
            message: 'HTTP 500 - Internal Server Error',
            status: 500,
            details: 'Error occurred'
        });
    });

    test('aborts request after timeout', async () => {
    jest.useFakeTimers();
    
    const abortError = new Error('Aborted');
    abortError.name = 'AbortError';

    global.fetch = jest.fn((input, options) => {
      return new Promise((resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(abortError);
        });
      });
    });

    const shortTimeoutClient = new RestClient(baseUrl, {}, { timeout: 10 });

    const request = shortTimeoutClient.getAsync('slow');

    jest.advanceTimersByTime(20);
    await Promise.resolve();
    jest.runOnlyPendingTimers();
    await Promise.resolve();

    await expect(request).rejects.toThrow('timed out');

    jest.useRealTimers();
});
});