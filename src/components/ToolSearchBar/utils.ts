import { Tool } from '../../models/Tool';

const LEVENSHTEIN_DISTANCE_THRESHOLD = 2;

export function levenshteinDistance(query: string, target: string): number {
  // /!\ CUSTOM BEHAVIOUR HERE
  // Custom distance of 0 for included string
  if (target.toLowerCase().includes(query.toLowerCase())) return 0;

  // Create a matrix to store the distances
  const matrix = [];

  // Initialize the first row and column with the character index
  for (let i = 0; i <= target.length; i += 1) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= query.length; j += 1) {
    matrix[0][j] = j;
  }

  // Calculate the distances for each combination of characters
  for (let i = 1; i <= target.length; i += 1) {
    for (let j = 1; j <= query.length; j += 1) {
      // Check if the current characters in the input strings match
      const cost = query[i - 1] === target[j - 1] ? 0 : 1;

      // Update the matrix with the minimum cost of reaching this position
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  // Return the distance of the last character in the matrix
  return matrix[target.length][query.length];
}

export function fuzzySearchTools(query: string, tools: Tool[]): Tool[] {
  const toolsAndDistance = tools.map((tool) => {
    const queryWords = query.split(' ').filter((w) => w !== '');

    const toolWords = [tool.name, ...tool.keywords];

    // Calculate the Levenshtein distance for each query word and item word combination
    const distances = toolWords.map((toolWord) =>
      queryWords.map((word) => levenshteinDistance(word, toolWord))
    );

    // Keep the minimal distance and associate it to the Tool
    const minDistance = Math.min(...distances.flat());

    return { tool, minDistance };
  });

  return toolsAndDistance
    .filter((td) => td.minDistance < LEVENSHTEIN_DISTANCE_THRESHOLD)
    .sort((td1, td2) => td1.minDistance - td2.minDistance)
    .map((td) => td.tool);
}

export function formatTimeToHHMMSS(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}h ${minutes}m ${seconds}s`;
}
