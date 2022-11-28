import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CopyButton from '../../../components/CopyButton';
import ColorPartPicker from './ColorPartPicker';
import { RGBColor } from './types';
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from './utils';

const DEFAULT_VALUE = {
  r: 100,
  g: 100,
  b: 100,
  a: 1,
  h: 0,
  s: 0,
  l: 39,
  hex: '646464',
};

function ColorConverter() {
  const [r, setR] = useState(DEFAULT_VALUE.r); // from 0 to 255
  const [g, setG] = useState(DEFAULT_VALUE.g); // from 0 to 255
  const [b, setB] = useState(DEFAULT_VALUE.b); // from 0 to 255
  const [a, setA] = useState(DEFAULT_VALUE.a); // from 0 to 1

  const [h, setH] = useState(DEFAULT_VALUE.h); // from 0 to 360
  const [s, setS] = useState(DEFAULT_VALUE.s); // from 0 to 100
  const [l, setL] = useState(DEFAULT_VALUE.l); // from 0 to 100

  const [hex, setHex] = useState(DEFAULT_VALUE.hex); // no # before the hex

  const handleHexChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newHex = e.currentTarget.value.trim().replace('#', '');
    setHex(newHex);
    const newRgbValues = hexToRgb(newHex);
    if (newRgbValues) {
      setR(newRgbValues.r);
      setG(newRgbValues.g);
      setB(newRgbValues.b);
      setA(1); // hex doesn't handle A value
      const newHslValues = rgbToHsl(newRgbValues);
      setH(newHslValues.h);
      setS(newHslValues.s);
      setL(newHslValues.l);
    }
  };

  const updateRgbFromHsl = (newValues: RGBColor) => {
    setR(newValues.r);
    setG(newValues.g);
    setB(newValues.b);
    setA(1); // hsl doesn't handle A value
    const newHexValue = rgbToHex(newValues);
    setHex(newHexValue);
  };

  const handleHChange = (vString: string, vNumber: number) => {
    setH(vNumber);
    const newRgbValues = hslToRgb(vNumber, s, l);
    updateRgbFromHsl(newRgbValues);
  };

  const handleSChange = (vString: string, vNumber: number) => {
    setS(vNumber);
    const newRgbValues = hslToRgb(h, vNumber, l);
    updateRgbFromHsl(newRgbValues);
  };

  const handleLChange = (vString: string, vNumber: number) => {
    setL(vNumber);
    const newRgbValues = hslToRgb(h, s, vNumber);
    updateRgbFromHsl(newRgbValues);
  };

  useEffect(() => {
    setHex(rgbToHex({ r, g, b }));
    const newHslValues = rgbToHsl({ r, g, b });
    setH(newHslValues.h);
    setS(newHslValues.s);
    setL(newHslValues.l);
  }, [r, g, b]);

  return (
    <>
      <Heading as="h1">Color converter</Heading>
      <Flex
        gap={4}
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Box border="1px" borderColor="gray.300" borderRadius={4} p={4}>
          <VStack spacing={4}>
            <ColorPartPicker
              label="R"
              onChange={(vString, vNumber) =>
                setR(Number.isNaN(vNumber) ? 0 : vNumber)
              }
              value={r}
              min={0}
              max={255}
              step={5}
            />
            <ColorPartPicker
              label="G"
              onChange={(vString, vNumber) =>
                setG(Number.isNaN(vNumber) ? 0 : vNumber)
              }
              value={g}
              min={0}
              max={255}
              step={5}
            />
            <ColorPartPicker
              label="B"
              onChange={(vString, vNumber) =>
                setB(Number.isNaN(vNumber) ? 0 : vNumber)
              }
              value={b}
              min={0}
              max={255}
              step={5}
            />
            <ColorPartPicker
              label="A"
              onChange={(vString, vNumber) =>
                setA(Number.isNaN(vNumber) ? 0 : vNumber)
              }
              value={a}
              min={0}
              max={1}
              step={0.05}
            />
            <Box position="relative" w="full">
              <Input isReadOnly value={`rgba(${r}, ${g}, ${b}, ${a})`} />
              <CopyButton valueToCopy={`rgba(${r}, ${g}, ${b}, ${a})`} />
            </Box>
          </VStack>
        </Box>
        <Box border="1px" borderColor="gray.300" borderRadius={4} p={4}>
          <VStack spacing={4}>
            <ColorPartPicker
              label="H"
              onChange={handleHChange}
              value={h}
              min={0}
              max={360}
              step={5}
            />
            <ColorPartPicker
              label="S"
              onChange={handleSChange}
              value={s}
              min={0}
              max={100}
              step={5}
            />
            <ColorPartPicker
              label="L"
              onChange={handleLChange}
              value={l}
              min={0}
              max={100}
              step={5}
            />
            <Box position="relative" w="full">
              <Input isReadOnly value={`hsl(${h}, ${s}%, ${l}%)`} />
              <CopyButton valueToCopy={`hsl(${h}, ${s}%, ${l}%)`} />
            </Box>
          </VStack>
        </Box>
        <Box border="1px" borderColor="gray.300" borderRadius={4} p={4}>
          <FormControl width="fit-content" display="flex" alignItems="center">
            <FormLabel>Hex</FormLabel>
            <Input value={`#${hex}`} onChange={handleHexChange} />
            <CopyButton
              valueToCopy={`#${hex}`}
              successMessage={`Hex value (#${hex}) copied to your clipboard!`}
            />
          </FormControl>
        </Box>
      </Flex>
      <br />
      <Box border="1px" borderColor="gray.300" borderRadius={4} p={2}>
        <Flex
          width="100%"
          height="200px"
          backgroundColor={`rgba(${r}, ${g}, ${b}, ${a})`}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Text color="#000" fontSize="2xl">
            Some text written in black
          </Text>
          <Text color="#888" fontSize="2xl">
            Some text written in gray
          </Text>
          <Text color="#fff" fontSize="2xl">
            Some text written in white
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default ColorConverter;
