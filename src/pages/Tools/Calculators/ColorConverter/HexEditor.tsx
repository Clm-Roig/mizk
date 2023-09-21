import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import CopyButton from '../../../../components/CopyButton';
import { hexToRgb } from './converters';

interface Props {
  hex: string;
  setR: (value: number) => void;
  setG: (value: number) => void;
  setB: (value: number) => void;
  setHex: (value: string) => void;
}

function HexEditor({ hex, setHex, setR, setG, setB }: Props) {
  const handleHexChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newHex = e.currentTarget.value.trim().replace('#', '');
    setHex(newHex);
    const newRgbValues = hexToRgb(newHex);
    if (newRgbValues) {
      setR(newRgbValues.r);
      setG(newRgbValues.g);
      setB(newRgbValues.b);
    }
  };

  return (
    <FormControl width="fit-content" display="flex" alignItems="center">
      <FormLabel>Hex</FormLabel>
      <Input value={`#${hex}`} onChange={handleHexChange} />
      <CopyButton
        valueToCopy={`#${hex}`}
        successMessage={`Hex value (#${hex}) copied to your clipboard!`}
      />
    </FormControl>
  );
}

export default HexEditor;
