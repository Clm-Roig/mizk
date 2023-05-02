import {
  Box,
  Center,
  CircularProgress,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CopyButton from '../../components/CopyButton';

const GET_IP_URL = 'https://ipapi.co/json/';

function WhatsMyIp() {
  const [myIp, setMyIp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(GET_IP_URL);
        const data = await response.json();
        setMyIp(data?.ip);
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(
          "Sorry, a rare error occured, we couldn't get your IP address :("
        );
      } finally {
        setIsLoading(false);
      }
    };
    doFetch();
  }, []);
  return (
    <>
      <Heading as="h1">What&apos;s my IP ?</Heading>
      <Center>
        <HStack gap={4}>
          <Text fontSize="xl">You IP address is: </Text>
          <Box minW={230} textAlign="center">
            {isLoading ? (
              <CircularProgress isIndeterminate />
            ) : (
              <Text fontSize="4xl">{myIp}</Text>
            )}
          </Box>
          <Box position="relative">
            <CopyButton
              valueToCopy={myIp || ''}
              size="md"
              position="static"
              successMessage={`${myIp} copied to your clipboard!`}
            >
              Copy
            </CopyButton>
          </Box>
        </HStack>
      </Center>
    </>
  );
}

export default WhatsMyIp;
