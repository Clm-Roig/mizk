import { Heading } from '@chakra-ui/react';
import ToolList from '../../components/ToolList';
import { GAME } from '../../data/toolTypes.ts';
import tools from '../../data/tools';

function GameTools() {
  const gameTools = tools.filter((t) => t.type.name === GAME.name);
  return (
    <>
      <Heading as="h1">Game Tools</Heading>
      <ToolList tools={gameTools} />
    </>
  );
}

export default GameTools;
