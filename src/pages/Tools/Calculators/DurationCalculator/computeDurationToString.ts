import parse from 'parse-duration';

const OPERATORS = ['+', '-'];

const isAnOperator = (value: unknown) =>
  typeof value === 'string' && OPERATORS.includes(value);

const secondsToTime = (s: number) => {
  const time = new Date(s * 1000);
  const hours = Math.floor((time.getTime() - new Date(0).getTime()) / 3600000);
  const minutes = time.getUTCMinutes();
  const seconds = time.getUTCSeconds();
  const milliseconds = time.getUTCMilliseconds();

  let result = '';
  if (hours !== 0 && hours >= 1) result += `${hours}h `;
  if (minutes !== 0) result += `${minutes}m `;
  if (seconds !== 0) result += `${seconds}s `;
  if (milliseconds !== 0) result += `${milliseconds}ms `;
  return result.trim();
};

type Result = {
  result: string;
  error: string;
};

const computeDurationToString = (value: string): Result => {
  let error = '';
  let resultInSeconds = 0;
  const splittedValues = value
    .trim()
    .split('')
    .filter((x) => x !== '')
    .reduce<string[]>((result, currentValue) => {
      const previousValue = result[result.length - 1];

      // Agregate two consecutives numbers (35 => ["3", "5"] => ["35"])
      if (
        !isAnOperator(currentValue) &&
        previousValue &&
        !isAnOperator(previousValue)
      ) {
        return [
          ...result.slice(0, result.length - 1),
          previousValue + currentValue,
        ];
      }

      return [...result, currentValue];
    }, []);
  let previousValue: unknown;
  const parsedValues = splittedValues.map((v: string) => {
    let result: unknown = v;
    if (!isAnOperator(v)) {
      // Convert everything in milliseconds
      result = parse(v, 's');
      if (result === null) {
        error = `The value ${v} can not be parsed.`;
      }
    }

    // Check if the syntax is correct
    if (isAnOperator(previousValue) && isAnOperator(result)) {
      error = `Two consecutives values can't be both an operator (${previousValue} and ${result}).`;
    }

    previousValue = result;
    return result;
  });

  if (error) return { result: '', error };

  previousValue = '';

  parsedValues.forEach((parsedValue) => {
    if (typeof parsedValue === 'number') {
      if (isAnOperator(previousValue)) {
        switch (previousValue) {
          case '+':
            resultInSeconds += parsedValue;
            break;
          case '-':
            resultInSeconds -= parsedValue;
            break;
          default:
            break;
        }
      } else {
        resultInSeconds += parsedValue;
      }
    }
    previousValue = parsedValue;
  });

  return { result: secondsToTime(resultInSeconds), error };
};

export default computeDurationToString;
