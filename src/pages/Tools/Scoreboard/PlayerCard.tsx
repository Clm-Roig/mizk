import {
  CardBody,
  CardHeader,
  CardProps,
  HStack,
  Heading,
  IconButton,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import getStringToColor from './getStringToColor';
import MCard from '../../../components/MCard';
import { Player } from './types';

type Props = {
  onAddScore: (player: Player, score: number) => void;
  onRemovePlayer: (player: Player) => void;
  player: Player;
} & CardProps;

function PlayerCard({
  onAddScore,
  onRemovePlayer,
  player,
  ...cardProps
}: Props) {
  const {
    colors: { red },
  } = useTheme();

  const iconSizes = { base: '48px', md: '72px' };

  return (
    <MCard
      key={player.name}
      backgroundColor={getStringToColor(player.name)}
      align="center"
      {...cardProps}
    >
      <CardHeader>
        <Heading>{player.name}</Heading>
        <IconButton
          variant="ghost"
          aria-label="delete"
          color={red[500]}
          icon={<FaTrash />}
          position="absolute"
          top={0}
          right={0}
          onClick={() => onRemovePlayer(player)}
        />
      </CardHeader>
      <CardBody>
        <HStack>
          <IconButton
            icon={<FaMinus />}
            aria-label="decrease score"
            onClick={() => onAddScore(player, -1)}
            height={iconSizes}
            width={iconSizes}
          />
          <Text fontSize="4xl" px={6}>
            {player.score}
          </Text>
          <IconButton
            icon={<FaPlus />}
            aria-label="increase score"
            onClick={() => onAddScore(player, 1)}
            height={iconSizes}
            width={iconSizes}
          />
        </HStack>
      </CardBody>
    </MCard>
  );
}

export default PlayerCard;
