import { useMemo, useState } from 'react';
import {
  Button,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  useTheme,
} from '@chakra-ui/react';
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaUndo,
} from 'react-icons/fa';
import stringToColor from './stringToColor';
import MCard from '../../../components/MCard';
import { Player } from './types';
import SortMenu, { SortType } from '../../../components/SortMenu';
import History from './History';
import NewPlayerForm from './NewPlayerForm';
import useHistoryEntries from './useHistoryEntries';
import usePlayers from './usePlayers';

const ALPHABETICAL_DOWN_SORT = 'ALPHABETICAL_DOWN_SORT';
const ALPHABETICAL_UP_SORT = 'ALPHABETICAL_UP_SORT';
const SCORE_DOWN_SORT = 'SCORE_DOWN_SORT';
const SCORE_UP_SORT = 'SCORE_UP_SORT';

const sortTypes: SortType[] = [
  {
    icon: <FaSortAlphaDown />,
    id: ALPHABETICAL_DOWN_SORT,
    name: 'Alphab. order A-Z',
  },
  {
    icon: <FaSortAlphaUp />,
    id: ALPHABETICAL_UP_SORT,
    name: 'Alphab. order Z-A',
  },
  {
    icon: <FaSortNumericDown />,
    id: SCORE_DOWN_SORT,
    name: 'Score (inc)',
  },
  {
    icon: <FaSortNumericUp />,
    id: SCORE_UP_SORT,
    name: 'Score (dec)',
  },
];

function Scoreboard() {
  const {
    colors: { red },
  } = useTheme();
  const {
    addPlayer,
    addScoreToPlayer,
    players,
    resetPlayersScore,
    removePlayer,
  } = usePlayers();
  const {
    addHistoryEvent,
    addScoreChange,
    deleteHistoryEntries,
    historyEntries,
  } = useHistoryEntries();
  const [selectedSortType, setSelectedSortType] = useState<SortType>(
    sortTypes[0]
  );

  const isNewPlayerNameValid = (newPlayerName: string) => {
    return players.every(
      (p) => p.name.toLowerCase() !== newPlayerName.trim().toLowerCase()
    );
  };

  const handleAddPlayer = (newPlayerName: string) => {
    addPlayer(newPlayerName);
    addHistoryEvent(`<b>${newPlayerName}</b> joins the game!`);
  };

  const handleAddScore = (toUpdatePlayer: Player, addedScore: number) => {
    addScoreToPlayer(toUpdatePlayer, addedScore);
    addScoreChange(addedScore, toUpdatePlayer);
  };

  const handleRemove = (player: Player) => {
    removePlayer(player);
    addHistoryEvent(`<b>${player.name}</b> leaves the game!`);
  };

  const handleChangeSortType = (newSortType: SortType) => {
    if (newSortType.id !== selectedSortType.id) {
      setSelectedSortType(newSortType);
    }
  };

  const handleResetScores = () => {
    if (players.some((p) => p.score !== 0)) {
      resetPlayersScore();
      addHistoryEvent('Scores reset!');
    }
  };

  const sortedPlayers = useMemo(() => {
    switch (selectedSortType.id) {
      case ALPHABETICAL_DOWN_SORT:
        return [...players].sort((p1, p2) => p1.name.localeCompare(p2.name));
      case ALPHABETICAL_UP_SORT:
        return [...players].sort((p1, p2) => -p1.name.localeCompare(p2.name));
      case SCORE_DOWN_SORT:
        return [...players].sort((p1, p2) =>
          p1.score - p2.score > 0 ? 1 : -1
        );
      case SCORE_UP_SORT:
        return [...players].sort((p1, p2) =>
          p2.score - p1.score > 0 ? 1 : -1
        );
      default: {
        throw new Error(`Unhandled sort type: ${selectedSortType.name}`);
      }
    }
  }, [players, selectedSortType.id, selectedSortType.name]);

  return (
    <>
      <HStack justifyContent="space-between">
        <Heading as="h1">Scoreboard</Heading>
        <HStack>
          <Button leftIcon={<FaUndo />} onClick={handleResetScores}>
            Reset scores
          </Button>
          <SortMenu
            onChangeSortType={handleChangeSortType}
            selectedSortType={selectedSortType}
            sortTypes={sortTypes}
          />
        </HStack>
      </HStack>

      <SimpleGrid spacing={4} minChildWidth="250px" w="full" mb={4}>
        {sortedPlayers.map((player) => (
          <MCard
            key={player.name}
            backgroundColor={stringToColor(player.name)}
            align="center"
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
                onClick={() => handleRemove(player)}
              />
            </CardHeader>
            <CardBody>
              <HStack>
                <IconButton
                  icon={<FaMinus />}
                  aria-label="decrease score"
                  onClick={() => handleAddScore(player, -1)}
                  size="sm"
                  variant="ghost"
                />
                <Text fontSize="4xl" px={6}>
                  {player.score}
                </Text>
                <IconButton
                  icon={<FaPlus />}
                  aria-label="increase score"
                  onClick={() => handleAddScore(player, 1)}
                  size="sm"
                  variant="ghost"
                />
              </HStack>
            </CardBody>
          </MCard>
        ))}
      </SimpleGrid>

      <NewPlayerForm
        onAddPlayer={handleAddPlayer}
        isNewPlayerNameValid={isNewPlayerNameValid}
      />

      <History
        deleteHistory={deleteHistoryEntries}
        historyEntries={historyEntries}
      />
    </>
  );
}

export default Scoreboard;
