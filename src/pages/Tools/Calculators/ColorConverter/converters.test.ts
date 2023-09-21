import { describe, it, expect } from 'vitest';
import { rgbToHex, rgbToHsl, hexToRgb, hslToRgb } from './converters';

describe('rgbToHex function', () => {
  it('returns the expected value from rgb to hex', () => {
    const rgb = { r: 31, g: 185, b: 15 };
    const result = rgbToHex(rgb);
    expect(result).toBe('1fb90f');
  });
});

describe('rgbToHsl function', () => {
  it('returns the expected value from rgb to hsl', () => {
    const rgb = { r: 198, g: 2, b: 54 };
    const result = rgbToHsl(rgb);
    expect(result).toStrictEqual({
      h: 344,
      s: 98,
      l: 39,
    });
  });
});

describe('hexToRgb function', () => {
  it('returns undefined for an hex string without the appropriate length', () => {
    const hex = '43b1';
    const result = hexToRgb(hex);
    expect(result).toBeUndefined();
  });
  it('returns the expected value from hex to rgb', () => {
    const hex = '4c03b2';
    const result = hexToRgb(hex);
    expect(result).toStrictEqual({
      r: 76,
      g: 3,
      b: 178,
    });
  });
});

describe('hslToRgb function', () => {
  it('returns the expected value from hsl to rgb', () => {
    const hsl = {
      h: 250,
      s: 50,
      l: 33,
    };
    const result = hslToRgb(hsl.h, hsl.s, hsl.l);
    expect(result).toStrictEqual({
      r: 56,
      g: 42,
      b: 126,
    });
  });
});
