import { Button, Center, Flex, Heading } from '@chakra-ui/react';

function Home() {
  return (
    <Center>
      <Flex direction="column">
        <Heading as="h1">Mizk</Heading>
        <Button colorScheme="primary">Button</Button>
      </Flex>
    </Center>
  );
}

export default Home;
