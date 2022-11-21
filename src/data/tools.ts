import { Tool } from '../models/Tool';
import { CALCULATOR, IMAGE } from './toolTypes.ts';

const tools: Array<Tool> = [
  {
    description: 'Add and substract duration, from milliseconds to days.',
    keywords: ['calculator', 'duration', 'second', 'hour', 'minut', 'day'],
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
    name: 'Image converter',
    type: IMAGE,
    url: '/images/converter',
  },
];

export default tools;
