import { describe, it, expect } from 'vitest';

import computeDurationToString from './computeDurationToString';

describe('computeDurationToString function', () => {
  it('returns an empty error and an empty result when an empty string is passed in', () => {
    const { result, error } = computeDurationToString('');
    expect(result).toBe('');
    expect(error).toBe('');
  });

  it('returns an empty error and an empty result when a spaces-only string is passed in', () => {
    const { result, error } = computeDurationToString('   ');
    expect(result).toBe('');
    expect(error).toBe('');
  });

  it('returns an error when an expression contains 2 operators in a row', () => {
    const { result, error } = computeDurationToString('3h + 1m + + 4s');
    expect(result).toBe('');
    expect(error).not.toBe('');
  });

  it("returns an error when a value can't be parsed", () => {
    const { result, error } = computeDurationToString('3h + 3xyz + 1s');
    expect(result).toBe('');
    expect(error).not.toBe('');
  });

  it('returns a result if the expression ends with an operator', () => {
    const { result, error } = computeDurationToString('3h + 10m - 1h +');
    expect(result).toBe('2h 10m');
    expect(error).toBe('');
  });

  it('returns valid results for various use cases', () => {
    const results = [];

    results.push({
      ...computeDurationToString('4h - 2h + 25m + 120s + 3s'),
      expected: '2h 27m 3s',
    });
    results.push({
      ...computeDurationToString('1day + 10h - 120s'),
      expected: '33h 58m',
    });
    results.push({
      ...computeDurationToString('3 + 50 - 3'),
      expected: '50ms',
    });

    results.forEach((res) => {
      expect(res.result).toBe(res.expected);
      expect(res.error).toBe('');
    });
  });
});
