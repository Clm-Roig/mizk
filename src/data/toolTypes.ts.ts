import {
  FaCalculator,
  FaExchangeAlt,
  FaImage,
  FaPalette,
} from 'react-icons/fa';
import { TbLetterCase } from 'react-icons/tb';
import { ToolType } from '../models/ToolType';

export const CALCULATOR_CONVERTER: ToolType = {
  icon: FaCalculator,
  name: 'Calculator / Converter',
  pluralName: 'Calculators / Converters',
  url: '/calculators-converters',
};
export const COLOR: ToolType = {
  icon: FaPalette,
  name: 'Color',
  pluralName: 'Colors',
  url: '/colors',
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
