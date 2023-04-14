import { Heading } from '@chakra-ui/react';
import ToolList from '../components/ToolList';
import tools from '../data/tools';

function Home() {
  const sortedTools = tools.sort((a, b) =>
    a.type.name.localeCompare(b.type.name)
  );
  return (
    <>
      <Heading as="h1">All tools</Heading>
      <ToolList tools={sortedTools} />
    </>
  );
}

export default Home;
