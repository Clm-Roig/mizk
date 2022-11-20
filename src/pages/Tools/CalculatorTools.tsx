import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { CALCULATOR } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function CalculatorTools() {
  const calculatorTools = tools.filter((t) => t.type.name === CALCULATOR.name);
  return (
    <>
      <Heading as="h1">Calculator Tools</Heading>
      <ToolList tools={calculatorTools} />
    </>
  );
}

export default CalculatorTools;
