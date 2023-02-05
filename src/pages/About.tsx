import { Heading, Stack, Text } from '@chakra-ui/react';
import ExternalLink from '../components/ExternalLink';

function About() {
  return (
    <>
      <Heading as="h1">About</Heading>
      <Stack spacing={3} maxWidth="800px" margin="auto">
        <Text fontSize="2xl">
          Mizk provides various multimedia and useful tools such as calculators,
          image processors or encoders / decoders.
        </Text>
        <Text>
          The tools offered are intended to be{' '}
          <b>simple, fast and easy to use</b>. On other sites of the same kind,
          it is often necessary to press a button to calculate the result of an
          operation. On Mizk, calculations are carried out in <b>real time</b>,
          at the pace of the user&apos;s input. Copy buttons for the results are
          also present to retrieve the value of a conversion or calculation.
        </Text>

        <Text fontSize="2xl">
          Website developed with passion by{' '}
          <ExternalLink href="https://clm-roig.github.io" fontWeight="bold">
            Clément ROIG
          </ExternalLink>
        </Text>

        <Text fontSize="2xl">
          <ExternalLink
            href="https://github.com/clm-roig/mizk"
            fontWeight="bold"
          >
            Open source code
          </ExternalLink>
        </Text>
      </Stack>
    </>
  );
}

export default About;
