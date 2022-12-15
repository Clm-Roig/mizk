import {
  Box,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CopyButton from '../../../components/CopyButton';
import Textarea from '../../../components/Textarea';

enum DecimalSeparator {
  DOT = '.',
  COMA = ',',
}

function MinMaxFinder() {
  const [inputText, setInputText] = useState('');
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [decimalSeparator, setDecimalSeparator] = useState<DecimalSeparator>(
    DecimalSeparator.DOT
  );

  const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputText(e.currentTarget.value);
  };

  useEffect(() => {
    const splittedText = inputText
      .split(
        decimalSeparator === DecimalSeparator.DOT
          ? DecimalSeparator.COMA
          : DecimalSeparator.DOT
      )
      .join(' ')
      .split(' ');

    let minValue = Infinity;
    let maxValue = -Infinity;
    splittedText.forEach((string) => {
      const stringNumber = parseFloat(
        decimalSeparator === DecimalSeparator.DOT
          ? string
          : string.replace(',', '.')
      );
      minValue = !Number.isNaN(stringNumber)
        ? Math.min(minValue, stringNumber)
        : minValue;
      maxValue = !Number.isNaN(stringNumber)
        ? Math.max(maxValue, stringNumber)
        : maxValue;
    });
    setMin(minValue === Infinity ? undefined : minValue);
    setMax(maxValue === -Infinity ? undefined : maxValue);
  }, [decimalSeparator, inputText]);

  return (
    <>
      <Heading as="h1">Min / Max Finder</Heading>

      <VStack spacing={4}>
        <VStack align="left" spacing={2} w="full">
          <Text fontSize="xl">Your text</Text>
          <Textarea value={inputText} onChange={handleInputChange} />
        </VStack>
        <VStack spacing={1} align="left" w="full">
          <Text fontSize="xl">Decimal separator</Text>
          <RadioGroup
            onChange={(v) => setDecimalSeparator(v as DecimalSeparator)}
            value={decimalSeparator}
          >
            <Stack direction="row" spacing={4}>
              <Radio value={DecimalSeparator.DOT}>Dot .</Radio>
              <Radio value={DecimalSeparator.COMA}>Coma ,</Radio>
            </Stack>
          </RadioGroup>
        </VStack>

        <HStack spacing={2} w="full" align="baseline">
          <VStack flex={1}>
            <Text fontSize="xl">Min value</Text>
            <HStack>
              <Text fontSize="5xl">{min}</Text>
            </HStack>
            <Box position="relative">
              <CopyButton
                valueToCopy={min || ''}
                size="md"
                position="static"
                successMessage={`${min} copied to your clipboard!`}
              >
                Copy min
              </CopyButton>
            </Box>
          </VStack>
          <VStack flex={1}>
            <Text fontSize="xl">Max value</Text>
            <HStack>
              <Text fontSize="5xl">{max}</Text>
            </HStack>
            <Box position="relative">
              <CopyButton
                valueToCopy={max || ''}
                size="md"
                position="static"
                successMessage={`${max} copied to your clipboard!`}
              >
                Copy max
              </CopyButton>
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default MinMaxFinder;
