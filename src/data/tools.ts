import { Tool } from '../models/Tool';
import {
  CALCULATOR_CONVERTER,
  COLOR,
  ENCODER_DECODER,
  IMAGE,
  STRING,
} from './toolTypes.ts';

const tools: Array<Tool> = [
  {
    description: 'Add and substract durations, from milliseconds to days.',
    keywords: ['calculator', 'duration', 'second', 'hour', 'minut', 'day'],
    menuName: 'Duration',
    name: 'Duration calculator',
    type: CALCULATOR_CONVERTER,
    url: `${CALCULATOR_CONVERTER.url}/duration`,
  },
  {
    description: 'Convert image from and to various formats.',
    keywords: [
      'image',
      'convert',
      'avif',
      'bmp',
      'gif',
      'jpg',
      'jpeg',
      'ico',
      'png',
      'svg',
      'webp',
    ],
    menuName: 'Converter',
    name: 'Image converter',
    type: IMAGE,
    url: `${IMAGE.url}/convert`,
  },
  {
    description: 'Encode or decode base64 strings.',
    keywords: ['encoder', 'decoder', 'base64'],
    menuName: 'Base64',
    name: 'Base64 encoder / decoder',
    type: ENCODER_DECODER,
    url: `${ENCODER_DECODER.url}/base64`,
  },
  {
    description: 'Crop images to your desired size.',
    keywords: ['image', 'crop', 'size', 'resize'],
    menuName: 'Cropper',
    name: 'Image cropper',
    type: IMAGE,
    url: `${IMAGE.url}/crop`,
  },
  {
    description: 'Convert a color from an to hex, rgba and hsl.',
    keywords: ['color', 'convert', 'rgb', 'hex', 'hsl'],
    menuName: 'Converter',
    name: 'Color converter',
    type: COLOR,
    url: `${COLOR.url}/converter`,
  },
  {
    description: 'Replace all occurences of a string in another string.',
    keywords: ['string', 'replace', 'replacer'],
    menuName: 'Replacer',
    name: 'String replacer',
    type: STRING,
    url: `${STRING.url}/replacer`,
  },
  {
    description: 'Count the number of words in your sentences.',
    keywords: ['string', 'words', 'counter'],
    menuName: 'Word counter',
    name: 'Word counter',
    type: STRING,
    url: `${STRING.url}/word-counter`,
  },
  {
    description:
      'Convert a temperature from and to Celsius, Farenheit and Kelvin.',
    keywords: [
      'temperature',
      'celsius',
      'farenheit',
      'kelvin',
      'converter',
      'convert',
    ],
    menuName: 'Temperature',
    name: 'Temperature Converter',
    type: CALCULATOR_CONVERTER,
    url: `${CALCULATOR_CONVERTER.url}/temperature`,
  },
];

export default tools;
