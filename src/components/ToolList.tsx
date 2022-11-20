import { SimpleGrid } from '@chakra-ui/react';
import { Tool } from '../models/Tool';
import ToolCard from './ToolCard';

interface Props {
  tools: Tool[];
}

function ToolList({ tools }: Props) {
  return (
    <SimpleGrid spacing={4} minChildWidth="250px" w="full">
      {tools.map((t) => (
        <ToolCard key={t.name} tool={t} />
      ))}
    </SimpleGrid>
  );
}

export default ToolList;
