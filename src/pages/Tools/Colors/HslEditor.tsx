import { Box, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import CopyButton from '../../../components/CopyButton';
import ColorPartPicker from './ColorPartPicker';
import { RGBColor } from './types';
import { hslToRgb } from './converters';

interface Props {
  h: number;
  s: number;
  l: number;
  setH: (value: number) => void;
  setS: (value: number) => void;
  setL: (value: number) => void;
  setR: (value: number) => void;
  setG: (value: number) => void;
  setB: (value: number) => void;
}

function HslEditor({ h, s, l, setH, setS, setL, setR, setG, setB }: Props) {
  const updateRgbFromHsl = (newValues: RGBColor) => {
    setR(newValues.r);
    setG(newValues.g);
    setB(newValues.b);
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

  return (
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
        <CopyButton
          valueToCopy={`hsl(${h}, ${s}%, ${l}%)`}
          successMessage={`Hsl value (hsl(${h}, ${s}%, ${l}%)) copied to your clipboard!`}
        />
      </Box>
    </VStack>
  );
}

export default HslEditor;
