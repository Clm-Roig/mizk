const sanitizeRegexpInput = (input: string): string => {
  const specialChars = /[[^$.*+?{}()|/]/g;
  const sanitizedInput = input
    .replace(specialChars, '\\$&')
    .replace(/\\/g, '\\\\'); // backslashes special escaping
  return sanitizedInput;
};

export default sanitizeRegexpInput;
