import { ToolType } from './ToolType';

export interface Tool {
  description: string;
  keywords: Array<string>;
  name: string;
  type: ToolType;
  url: string;
}
