import ActionPayload from '../src/classes/ActionPayload.js';

describe('ActionPayload', () => {
  test('should correctly store action and data', () => {
    const payload = new ActionPayload('login', { user: 'admin' });
    expect(payload.action).toBe('login');
    expect(payload.data).toEqual({ user: 'admin' });
  });

  test('should default data to null when not provided', () => {
    const payload = new ActionPayload('ping');
    expect(payload.action).toBe('ping');
    expect(payload.data).toBeNull();
  });

  test('should handle null data explicitly', () => {
    const payload = new ActionPayload('logout', null);
    expect(payload.action).toBe('logout');
    expect(payload.data).toBeNull();
  });

  test('should handle nested object as data', () => {
    const data = { user: 'admin', permissions: { read: true, write: false } };
    const payload = new ActionPayload('updateUser', data);
    expect(payload.data).toEqual(data);
  });

  test('should allow empty string as action (if not validated)', () => {
    const payload = new ActionPayload('', { foo: 'bar' });
    expect(payload.action).toBe('');
    expect(payload.data).toEqual({ foo: 'bar' });
  });
});
