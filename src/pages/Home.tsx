import { Heading } from '@chakra-ui/react';
import ToolList from '../components/ToolList';
import tools from '../data/tools';

function Home() {
  return (
    <>
      <Heading as="h1">All our tools</Heading>
      <ToolList tools={tools} />
    </>
  );
}

export default Home;
