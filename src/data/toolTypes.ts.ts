import { ToolType } from '../models/ToolType';

export const CALCULATOR: ToolType = {
  name: 'calculator',
};
export const ENCODER_DECODER: ToolType = {
  name: 'encoder / decoder',
};
export const IMAGE: ToolType = {
  name: 'image',
};

export const toolTypes: Array<ToolType> = [CALCULATOR, ENCODER_DECODER, IMAGE];
