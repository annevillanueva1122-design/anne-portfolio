import { describe, expect, it } from 'vitest';
import { isEmail } from './format';

describe('isEmail', () => {
  it.each([['jamie@example.com', true], ['not-an-email', false], ['a@b', false], ['  a@b.co  ', true]])('%s -> %s', (v, ok) =>
    expect(isEmail(v)).toBe(ok));
});
