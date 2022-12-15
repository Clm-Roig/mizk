import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { TEXT } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function TextTools() {
  const textTools = tools.filter((t) => t.type.name === TEXT.name);
  return (
    <>
      <Heading as="h1">Text Tools</Heading>
      <ToolList tools={textTools} />
    </>
  );
}

export default TextTools;
