// Custom round function to round precisely at 2 digits
const round = (nb: number) => Math.round((nb + Number.EPSILON) * 100) / 100;

export const celsiusToKelvin = (celsius: string) =>
  `${round(parseFloat(celsius) + 273.15)}`;
export const farenheitToKelvin = (fahrenheit: string) =>
  `${round(((parseFloat(fahrenheit) - 32) * 5) / 9 + 273.15)}`;
export const kelvinToFarenheit = (kelvin: string) =>
  `${round(((parseFloat(kelvin) - 273.15) * 9) / 5 + 32)}`;
export const kelvinToCelsius = (kelvin: string) =>
  `${round(parseFloat(kelvin) - 273.15)}`;
export const farenheitToCelsius = (farenheit: string) =>
  `${round((parseFloat(farenheit) - 32) * (5 / 9))}`;
export const celsiusToFarenheit = (celsius: string) =>
  `${round(parseFloat(celsius) * (9 / 5) + 32)}`;
