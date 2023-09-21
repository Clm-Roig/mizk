import { Tool } from '../models/Tool';
import {
  CALCULATOR_CONVERTER,
  DOMAIN,
  ENCODER_DECODER,
  GAME,
  IMAGE,
  TEXT,
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
    description: 'Convert image to JPG.',
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
    name: 'To JPG converter',
    type: IMAGE,
    url: `${IMAGE.url}/convert-to-jpg`,
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
    description: 'Convert a color from and to hex, rgba and hsl.',
    keywords: ['color', 'convert', 'rgb', 'hex', 'hsl'],
    menuName: 'Converter',
    name: 'Color converter',
    type: CALCULATOR_CONVERTER,
    url: `${CALCULATOR_CONVERTER.url}/color`,
  },
  {
    description: 'Replace all occurences of a string in another string.',
    keywords: ['string', 'replace', 'replacer'],
    menuName: 'Replacer',
    name: 'String replacer',
    type: TEXT,
    url: `${TEXT.url}/replacer`,
  },
  {
    description: 'Count the number of words in your sentences.',
    keywords: ['string', 'words', 'counter'],
    menuName: 'Word counter',
    name: 'Word counter',
    type: TEXT,
    url: `${TEXT.url}/word-counter`,
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
    name: 'Temperature converter',
    type: CALCULATOR_CONVERTER,
    url: `${CALCULATOR_CONVERTER.url}/temperature`,
  },
  {
    description: 'Find the maximum and minimum value of a list of numbers.',
    keywords: ['number', 'max', 'min', 'maximum', 'minimum', 'range', 'find'],
    menuName: 'Min / Max finder',
    name: 'Min / Max finder',
    type: TEXT,
    url: `${TEXT.url}/min-max-finder`,
  },
  {
    description: 'Order a list of words or numbers.',
    keywords: [
      'list',
      'order',
      'sort',
      'alphabetical',
      'sorter',
      'number',
      'words',
    ],
    menuName: 'List sorter',
    name: 'List sorter',
    type: TEXT,
    url: `${TEXT.url}/list-sorter`,
  },
  {
    description: 'Find your IP address.',
    keywords: ['ip', 'address'],
    menuName: "What's my IP?",
    name: "What's my IP?",
    type: DOMAIN,
    url: `${DOMAIN.url}/my-ip`,
  },
  {
    description: "Keep track of the players' score.",
    keywords: ['score', 'counter', 'player'],
    menuName: 'Scoreboard',
    name: 'Scoreboard',
    type: GAME,
    url: `${GAME.url}/scoreboard`,
  },
];

export default tools;
