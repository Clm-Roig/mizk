import { Heading } from '@chakra-ui/react';
import ToolList from '../components/ToolList';
import tools from '../data/tools';

function Home() {
  const sortedTools = tools.sort((a, b) => {
    if (a.type.name > b.type.name) return 1;
    if (a.type.name < b.type.name) return -1;
    return 0;
  });
  return (
    <>
      <Heading as="h1">All tools</Heading>
      <ToolList tools={sortedTools} />
    </>
  );
}

export default Home;
