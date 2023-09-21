import { FaCalculator, FaExchangeAlt, FaImage, FaDice } from 'react-icons/fa';
import { TbLetterCase, TbWorldWww } from 'react-icons/tb';
import { ToolType } from '../models/ToolType';

export const CALCULATOR_CONVERTER: ToolType = {
  icon: FaCalculator,
  name: 'Calculator / Converter',
  pluralName: 'Calculators / Converters',
  url: '/calculators-converters',
};

export const ENCODER_DECODER: ToolType = {
  icon: FaExchangeAlt,
  name: 'Encoder / Decoder',
  pluralName: 'Encoders / Decoders',
  url: '/encoders-decoders',
};

export const IMAGE: ToolType = {
  icon: FaImage,
  name: 'Image',
  pluralName: 'Images',
  url: '/images',
};

export const TEXT: ToolType = {
  icon: TbLetterCase,
  name: 'Text',
  pluralName: 'Texts',
  url: '/texts',
};

export const DOMAIN: ToolType = {
  icon: TbWorldWww,
  name: 'Domain',
  pluralName: 'Domain',
  url: '/domain',
};

export const GAME: ToolType = {
  icon: FaDice,
  name: 'Game',
  pluralName: 'Games',
  url: '/games',
};
