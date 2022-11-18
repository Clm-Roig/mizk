import { Box, Button, Heading } from '@chakra-ui/react';

function Home() {
  return (
    <Box
      display="flex"
      margin="auto"
      flexDirection="column"
      justifyContent="center"
      maxWidth="50%"
    >
      <Heading as="h1" textAlign="center">
        Mizk
      </Heading>
      <Button colorScheme="primary">Button</Button>
    </Box>
  );
}

export default Home;
