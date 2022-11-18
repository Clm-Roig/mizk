import { Heading, Link } from '@chakra-ui/react';

function NotFound() {
  return (
    <>
      <Heading as="h1">Not Found</Heading>
      <Link href="/">Go home</Link>
    </>
  );
}

export default NotFound;
