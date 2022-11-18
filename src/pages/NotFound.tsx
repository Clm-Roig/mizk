import { Heading, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Heading as="h1">Not Found</Heading>
      <ChakraLink as={Link} to="/">
        Go home
      </ChakraLink>
    </>
  );
}

export default NotFound;
