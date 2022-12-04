import { Alert, AlertIcon, Box, Divider, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { Tool } from '../models/Tool';
import ToolCard from './ToolCard';
import ToolSearchBar from './ToolSearchBar';

interface Props {
  tools: Tool[];
}

function ToolList({ tools }: Props) {
  const [foundTools, setFoundTools] = useState<Tool[]>(tools);

  return (
    <>
      <ToolSearchBar tools={tools} setFoundTools={setFoundTools} />
      <Divider my={[2, 4]} />
      <SimpleGrid spacing={4} minChildWidth="250px" w="full">
        {foundTools.map((t) => (
          <Box key={t.name} maxWidth="350px">
            <ToolCard tool={t} />
          </Box>
        ))}
        {foundTools.length === 0 && (
          <Alert status="info">
            <AlertIcon />
            There is no tool matching your search! Try something else.
          </Alert>
        )}
      </SimpleGrid>
    </>
  );
}

export default ToolList;
