import { Tool } from '../models/Tool';
import { CALCULATOR, COLOR, ENCODER_DECODER, IMAGE } from './toolTypes.ts';

const tools: Array<Tool> = [
  {
    description: 'Add and substract durations, from milliseconds to days.',
    keywords: ['calculator', 'duration', 'second', 'hour', 'minut', 'day'],
    menuName: 'Duration',
    name: 'Duration calculator',
    type: CALCULATOR,
    url: '/calculators/duration',
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
    url: '/images/convert',
  },
  {
    description: 'Encode or decode base64 strings.',
    keywords: ['encoder', 'decoder', 'base64'],
    menuName: 'Base64',
    name: 'Base64 encoder / decoder',
    type: ENCODER_DECODER,
    url: '/encoders-decoders/base64',
  },
  {
    description: 'Crop images to your desired size.',
    keywords: ['image', 'crop', 'size', 'resize'],
    menuName: 'Cropper',
    name: 'Image cropper',
    type: IMAGE,
    url: '/images/crop',
  },
  {
    description: 'Convert a color from an to hex, rgba and hsl.',
    keywords: ['color', 'convert', 'rgb', 'hex', 'hsl'],
    menuName: 'Converter',
    name: 'Color converter',
    type: COLOR,
    url: '/colors/converter',
  },
];

export default tools;
