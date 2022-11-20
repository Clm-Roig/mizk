import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { IMAGE } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function ImageTools() {
  const imageTools = tools.filter((t) => t.type.name === IMAGE.name);
  return (
    <>
      <Heading as="h1">Image Tools</Heading>
      <ToolList tools={imageTools} />
    </>
  );
}

export default ImageTools;
