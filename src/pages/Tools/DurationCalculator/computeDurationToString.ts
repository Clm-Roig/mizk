import parse from 'parse-duration';

const OPERATORS = ['+', '-'];

const isAnOperator = (value: unknown) =>
  typeof value === 'string' && OPERATORS.includes(value);

const msToTime = (ms: number) => {
  const time = new Date(ms);
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
  let resultInMs = 0;
  const splittedValues = value
    .trim()
    .split(' ')
    .filter((x) => x !== '');
  let previousValue: unknown;
  const parsedValues = splittedValues.map((v: string) => {
    let result: unknown = v;
    if (!isAnOperator(v)) {
      // Convert everything in milliseconds
      result = parse(v);
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
            resultInMs += parsedValue;
            break;
          case '-':
            resultInMs -= parsedValue;
            break;
          default:
            break;
        }
      } else {
        resultInMs += parsedValue;
      }
    }
    previousValue = parsedValue;
  });

  return { result: msToTime(resultInMs), error };
};

export default computeDurationToString;
