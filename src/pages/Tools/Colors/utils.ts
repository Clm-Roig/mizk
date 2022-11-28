import { HSLColor, RGBColor } from './types';

// Taken from https://stackoverflow.com/a/54071699/16939610
// in: r,g,b in [0,255], out: h in [0,360) and s,l in [0,100]
const rgbToHsl = (color: RGBColor): HSLColor => {
  const { r, g, b } = color;
  const newR = r / 255;
  const newG = g / 255;
  const newB = b / 255;
  const v = Math.max(newR, newG, newB);
  const c = v - Math.min(newR, newG, newB);
  const f = 1 - Math.abs(v + v - c - 1);
  const h =
    c &&
    // eslint-disable-next-line no-nested-ternary
    (v === newR
      ? (newG - newB) / c
      : v === newG
      ? 2 + (newB - newR) / c
      : 4 + (newR - newG) / c);
  return {
    h: Math.trunc(60 * (h < 0 ? h + 6 : h)),
    s: Math.trunc(f ? (c / f) * 100 : 0),
    l: Math.trunc(((v + v - c) / 2) * 100),
  };
};

// Taken from https://stackoverflow.com/a/64090995/16939610
// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,255]
const hslToRgb = (h: number, s: number, l: number) => {
  const lBetween0And1 = l / 100;
  const sBetween0And1 = s / 100;
  const a = sBetween0And1 * Math.min(lBetween0And1, 1 - lBetween0And1);
  const f = (n: number, k = (n + h / 30) % 12) =>
    lBetween0And1 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return {
    r: Math.trunc(f(0) * 255),
    g: Math.trunc(f(8) * 255),
    b: Math.trunc(f(4) * 255),
  };
};

const rgbToHex = (color: RGBColor): string => {
  const r = color.r.toString(16).padStart(2, '0');
  const g = color.g.toString(16).padStart(2, '0');
  const b = color.b.toString(16).padStart(2, '0');
  return `${r}${g}${b}`;
};

const hexToRgb = (hexValue: string): RGBColor | undefined => {
  if (hexValue.length !== 6) return undefined;
  const rPart = hexValue.slice(0, 2);
  const gPart = hexValue.slice(2, 4);
  const bPart = hexValue.slice(4, 6);
  const rValue = parseInt(rPart, 16);
  const gValue = parseInt(gPart, 16);
  const bValue = parseInt(bPart, 16);
  if (rValue < 0 && rValue > 255) return undefined;
  if (gValue < 0 && gValue > 255) return undefined;
  if (bValue < 0 && bValue > 255) return undefined;
  return { r: rValue, g: gValue, b: bValue };
};

export { hexToRgb, rgbToHex, rgbToHsl, hslToRgb };
