import { FaCalculator, FaExchangeAlt, FaImage } from 'react-icons/fa';
import { ToolType } from '../models/ToolType';

export const CALCULATOR: ToolType = {
  icon: FaCalculator,
  name: 'Calculator',
  pluralName: 'Calculators',
  url: '/calculators',
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

export const toolTypes: Array<ToolType> = [CALCULATOR, ENCODER_DECODER, IMAGE];