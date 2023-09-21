const minBrightness = 82; // Adjust this value to control brightness

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Ensure that the generated color is bright (light)
  const color = `hsl(${Math.abs(hash) % 360}, 100%, ${
    minBrightness + (Math.abs(hash) % (100 - minBrightness))
  }%)`;
  return color;
}

export default stringToColor;
