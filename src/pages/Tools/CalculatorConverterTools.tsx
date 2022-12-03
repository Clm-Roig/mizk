import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { CALCULATOR_CONVERTER } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function CalculatorConverterTools() {
  const calculatorTools = tools.filter(
    (t) => t.type.name === CALCULATOR_CONVERTER.name
  );
  return (
    <>
      <Heading as="h1">Calculator / Converter Tools</Heading>
      <ToolList tools={calculatorTools} />
    </>
  );
}

export default CalculatorConverterTools;
