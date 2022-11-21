import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { ENCODER_DECODER } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function EncoderDecoderTools() {
  const encoderDecoderTools = tools.filter(
    (t) => t.type.name === ENCODER_DECODER.name
  );
  return (
    <>
      <Heading as="h1">Encoder / Decoder Tools</Heading>
      <ToolList tools={encoderDecoderTools} />
    </>
  );
}

export default EncoderDecoderTools;
