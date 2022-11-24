import { Tool } from '../models/Tool';
import { CALCULATOR, ENCODER_DECODER, IMAGE } from './toolTypes.ts';

const tools: Array<Tool> = [
  {
    description: 'Add and substract duration, from milliseconds to days.',
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
    description: 'Encode or decode a base 64 string',
    keywords: ['encoder', 'decoder', 'base64'],
    menuName: 'Base64',
    name: 'Base64 encoder / decoder',
    type: ENCODER_DECODER,
    url: '/encoders-decoders/base64',
  },
  {
    description: 'Crop an image to your desired size.',
    keywords: ['image', 'crop', 'size', 'resize'],
    menuName: 'Cropper',
    name: 'Image cropper',
    type: IMAGE,
    url: '/images/crop',
  },
];

export default tools;