import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { STRING } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function StringTools() {
  const stringTools = tools.filter((t) => t.type.name === STRING.name);
  return (
    <>
      <Heading as="h1">String Tools</Heading>
      <ToolList tools={stringTools} />
    </>
  );
}

export default StringTools;
