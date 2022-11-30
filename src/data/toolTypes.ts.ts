import {
  FaCalculator,
  FaExchangeAlt,
  FaImage,
  FaPalette,
} from 'react-icons/fa';
import { TbLetterCase } from 'react-icons/tb';
import { ToolType } from '../models/ToolType';

export const CALCULATOR: ToolType = {
  icon: FaCalculator,
  name: 'Calculator',
  pluralName: 'Calculators',
  url: '/calculators',
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

export const STRING: ToolType = {
  icon: TbLetterCase,
  name: 'Sring',
  pluralName: 'Strings',
  url: '/strings',
};

export const toolTypes: Array<ToolType> = [CALCULATOR, ENCODER_DECODER, IMAGE];
