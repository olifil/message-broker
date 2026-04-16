import { describe, it, expect } from '@jest/globals';
import { UserCreatedContract } from './created';

const base = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  firstName: 'John',
  lastName: 'Doe',
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('UserCreatedContract', () => {
  it('has the correct subject', () => {
    expect(UserCreatedContract.subject).toBe('user.created');
  });

  it('parses a valid payload with email only', () => {
    const payload = { ...base, email: 'john.doe@example.com' };
    expect(UserCreatedContract.schema.parse(payload)).toEqual(payload);
  });

  it('parses a valid payload with phoneNumber only', () => {
    const payload = { ...base, phoneNumber: '+33612345678' };
    expect(UserCreatedContract.schema.parse(payload)).toEqual(payload);
  });

  it('parses a valid payload with both email and phoneNumber', () => {
    const payload = { ...base, email: 'john.doe@example.com', phoneNumber: '+33612345678' };
    expect(UserCreatedContract.schema.parse(payload)).toEqual(payload);
  });

  it('rejects a payload with neither email nor phoneNumber', () => {
    expect(() => UserCreatedContract.schema.parse(base)).toThrow(
      'At least one of email or phoneNumber must be provided',
    );
  });

  it('rejects a payload with an invalid email', () => {
    expect(() => UserCreatedContract.schema.parse({ ...base, email: 'not-an-email' })).toThrow();
  });

  it('rejects a payload with missing required fields', () => {
    expect(() => UserCreatedContract.schema.parse({})).toThrow();
  });
});
