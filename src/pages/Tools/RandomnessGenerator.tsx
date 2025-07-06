import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  CircularProgress,
  Fade,
  HStack,
  Heading,
  ScaleFade,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaDiceD20, FaDiceSix, FaDiceTwo } from 'react-icons/fa';
import NumberEditor from '../../components/NumberEditor';

const ANIMATION_DURATION = 500;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 6;
const NB_EDITOR_MAX_WIDTH = 100;

const getRandomNumber = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

function RandomnessGenerator() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [minValue, setMinValue] = useState<number>(DEFAULT_MIN);
  const [maxValue, setMaxValue] = useState<number>(DEFAULT_MAX);
  const [result, setResult] = useState<number>(
    getRandomNumber(DEFAULT_MIN, DEFAULT_MAX)
  );

  useEffect(() => {
    // Display result at first rendering of the component
    onOpen();
  }, [onOpen]);

  const handleOnComputeClick = () => {
    onClose();
    setTimeout(() => {
      const newResult = getRandomNumber(minValue, maxValue);
      setResult(newResult);
      onOpen();
    }, ANIMATION_DURATION);
  };

  const setPresetAndCompute = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max);
    handleOnComputeClick();
  };

  return (
    <>
      <Heading as="h1">Randomness Generator</Heading>
      <HStack justify="center">
        <Text>Presets:</Text>
        <Button
          leftIcon={<FaDiceTwo />}
          onClick={() => setPresetAndCompute(1, 2)}
        >
          D2
        </Button>
        <Button
          leftIcon={<FaDiceSix />}
          onClick={() => setPresetAndCompute(1, 6)}
        >
          D6
        </Button>
        <Button
          leftIcon={<FaDiceD20 />}
          onClick={() => setPresetAndCompute(1, 10)}
        >
          D10
        </Button>
        <Button
          leftIcon={<FaDiceD20 />}
          onClick={() => setPresetAndCompute(1, 20)}
        >
          D20
        </Button>
      </HStack>

      <HStack justify="center" gap={8} mt={4}>
        <Box>
          <NumberEditor
            hideCopyButton
            label="Min value"
            max={maxValue}
            maxW={NB_EDITOR_MAX_WIDTH}
            onChange={(vString, vNumber) => setMinValue(vNumber)}
            value={minValue}
          />
        </Box>
        <Box>
          <NumberEditor
            hideCopyButton
            label="Max value"
            maxW={NB_EDITOR_MAX_WIDTH}
            min={minValue}
            onChange={(vString, vNumber) => setMaxValue(vNumber)}
            value={maxValue}
          />
        </Box>
      </HStack>

      <Center mt={4}>
        <Button size="lg" onClick={handleOnComputeClick}>
          Compute
        </Button>
      </Center>

      <VStack mt={8}>
        <Text fontSize="xl">RESULT</Text>
        <Box h={100} position="relative">
          <AbsoluteCenter>
            {isOpen ? (
              <ScaleFade in={isOpen} unmountOnExit initialScale={0.4}>
                <Text fontSize="7xl">{result}</Text>
              </ScaleFade>
            ) : (
              <Fade in={!isOpen} unmountOnExit>
                <CircularProgress isIndeterminate />
              </Fade>
            )}
          </AbsoluteCenter>
        </Box>
      </VStack>
    </>
  );
}

export default RandomnessGenerator;
