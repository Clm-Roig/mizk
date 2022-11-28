import { Box, BoxProps, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { rgbToHex, rgbToHsl } from './converters';
import RgbaEditor from './RgbaEditor';
import HslEditor from './HslEditor';
import HexEditor from './HexEditor';

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

const boxProps: BoxProps = {
  border: '1px',
  borderColor: 'gray.400',
  borderRadius: 4,
  p: 4,
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

  useEffect(() => {
    // Everytime r,g or b values are updated, update hex and hsl
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
        <Box {...boxProps}>
          <RgbaEditor
            r={r}
            g={g}
            b={b}
            a={a}
            setR={setR}
            setG={setG}
            setB={setB}
            setA={setA}
          />
        </Box>
        <Box {...boxProps}>
          <HslEditor
            h={h}
            s={s}
            l={l}
            setH={setH}
            setS={setS}
            setL={setL}
            setR={setR}
            setG={setG}
            setB={setB}
          />
        </Box>
        <Box {...boxProps}>
          <HexEditor
            hex={hex}
            setHex={setHex}
            setR={setR}
            setG={setG}
            setB={setB}
          />
        </Box>
      </Flex>
      <br />
      <Box {...boxProps} p={2}>
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
