function getDarkerColor(hslString: string): string {
  const brightnessReduction = 20;
  const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/i;
  const match = hslString.match(regex);

  if (!match) {
    throw new Error(
      "HSL color format invalid. Use the format 'hsl(H, S%, L%)'."
    );
  }

  const h = parseInt(match[1], 10);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);

  const newL = Math.max(0, l - brightnessReduction);

  return `hsl(${h}, ${s}%, ${newL}%)`;
}

export default getDarkerColor;
