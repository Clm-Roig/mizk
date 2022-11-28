import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { COLOR } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function ColorTools() {
  const colorTools = tools.filter((t) => t.type.name === COLOR.name);
  return (
    <>
      <Heading as="h1">Color Tools</Heading>
      <ToolList tools={colorTools} />
    </>
  );
}

export default ColorTools;
