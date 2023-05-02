import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { DOMAIN } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function DomainTools() {
  const domainTools = tools.filter((t) => t.type.name === DOMAIN.name);
  return (
    <>
      <Heading as="h1">Domain Tools</Heading>
      <ToolList tools={domainTools} />
    </>
  );
}

export default DomainTools;
