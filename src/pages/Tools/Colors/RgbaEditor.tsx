import { Box, Input, VStack } from '@chakra-ui/react';
import CopyButton from '../../../components/CopyButton';
import NumberEditor from '../../../components/NumberEditor';

interface Props {
  r: number;
  g: number;
  b: number;
  a: number;
  setR: (value: number) => void;
  setG: (value: number) => void;
  setB: (value: number) => void;
  setA: (value: number) => void;
}

function RgbaEditor({ r, g, b, a, setR, setG, setB, setA }: Props) {
  return (
    <VStack spacing={4}>
      <NumberEditor
        label="R"
        onChange={(vString, vNumber) =>
          setR(Number.isNaN(vNumber) ? 0 : vNumber)
        }
        value={r}
        min={0}
        max={255}
        step={5}
      />
      <NumberEditor
        label="G"
        onChange={(vString, vNumber) =>
          setG(Number.isNaN(vNumber) ? 0 : vNumber)
        }
        value={g}
        min={0}
        max={255}
        step={5}
      />
      <NumberEditor
        label="B"
        onChange={(vString, vNumber) =>
          setB(Number.isNaN(vNumber) ? 0 : vNumber)
        }
        value={b}
        min={0}
        max={255}
        step={5}
      />
      <NumberEditor
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
        <CopyButton
          valueToCopy={`rgba(${r}, ${g}, ${b}, ${a})`}
          successMessage={`Rgba value (rgba(${r}, ${g}, ${b}, ${a})) copied to your clipboard!`}
        />
      </Box>
    </VStack>
  );
}

export default RgbaEditor;
