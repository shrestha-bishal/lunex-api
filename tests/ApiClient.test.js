import ApiClient from '../src/classes/ApiClient.js';
import { jest } from '@jest/globals'; 

global.fetch = jest.fn();

describe('ApiClient', () => {
  const baseUrl = 'https://api.example.com';
  let client;

  beforeEach(() => {
    client = new ApiClient(baseUrl);
    fetch.mockReset();
  });

  test('should return JSON from getAsync', async () => {
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ status: 'ok' })
    });

    const result = await client.getAsync('status');
    expect(result).toEqual({ status: 'ok' });
  });

});