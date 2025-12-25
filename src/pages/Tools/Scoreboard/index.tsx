import { useEffect, useMemo, useState } from 'react';
import {
  Box,
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
import { v4 as uuidv4 } from 'uuid';
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
import { Player, ScoreChange } from './types';
import SortMenu, { SortType } from '../../../components/SortMenu';
import History from './History';
import NewPlayerForm from './NewPlayerForm';
import useHistoryEntries from './useHistoryEntries';
import usePlayers from './usePlayers';
import NumberEditor from '../../../components/NumberEditor';
import useDebounce from '../../../hooks/useDebounce';

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
  const [pendingScoreChanges, setPendingScoreChanges] = useState<
    Array<ScoreChange>
  >([]);
  const debouncedScoreChanges = useDebounce(pendingScoreChanges, 1000);
  const {
    addPlayer,
    addScoreToPlayer,
    players,
    removePlayer,
    setScoreForAllPlayers,
  } = usePlayers();
  const {
    addHistoryEvent,
    addScoreChange,
    addScoreSet,
    deleteHistoryEntries,
    historyEntries,
  } = useHistoryEntries();
  const [selectedSortType, setSelectedSortType] = useState<SortType>(
    sortTypes[0]
  );
  const [scoreToSet, setScoreToSet] = useState<number | undefined>(10);

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
    // Immediately add score to player
    addScoreToPlayer(toUpdatePlayer, addedScore);
    // Wait for debouncing before adding to the history
    setPendingScoreChanges((prev) => [
      ...prev,
      {
        addedScore,
        date: new Date(),
        id: uuidv4(),
        newScore: toUpdatePlayer.score + addedScore,
        player: toUpdatePlayer,
        previousScore: toUpdatePlayer.score,
      },
    ]);
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
      setScoreForAllPlayers(0);
      addHistoryEvent('Scores reset!');
    }
  };

  const handleSetForAllPlayersClick = () => {
    if (scoreToSet) {
      setScoreForAllPlayers(scoreToSet);
      const date = new Date();
      players.forEach((p) => {
        addScoreSet({
          date,
          id: uuidv4(),
          newScore: scoreToSet,
          player: p,
          previousScore: p.score,
        });
      });
    }
  };

  // Apply debounced score changes to the history
  useEffect(() => {
    if (debouncedScoreChanges?.length > 0) {
      const aggScoreChanges = debouncedScoreChanges.reduce(
        (result: ScoreChange[], currScoreChange) => {
          const playerScoreChangeIdx = result.findIndex(
            (sc) => sc.player.name === currScoreChange.player.name
          );
          if (playerScoreChangeIdx === -1) {
            return [...result, currScoreChange];
          }
          const playerScoreChange = result[playerScoreChangeIdx];
          return [
            ...result.filter(
              (sc) => sc.player.name !== playerScoreChange.player.name
            ),
            {
              ...playerScoreChange,
              id: uuidv4(),
              addedScore:
                playerScoreChange.addedScore + currScoreChange.addedScore,
              newScore: playerScoreChange.newScore + currScoreChange.addedScore,
            },
          ];
        },
        []
      );

      const date = new Date(); // set same date for all changes
      aggScoreChanges
        .map((sc) => ({ ...sc, date }))
        .forEach((sc) => addScoreChange(sc));

      if (Object.keys(debouncedScoreChanges).length > 0) {
        setPendingScoreChanges([]);
      }
    }
  }, [addScoreChange, debouncedScoreChanges, players]);

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
                  size="lg"
                />
                <Text fontSize="4xl" px={6}>
                  {player.score}
                </Text>
                <IconButton
                  icon={<FaPlus />}
                  aria-label="increase score"
                  onClick={() => handleAddScore(player, 1)}
                  size="lg"
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

      <Box mt={4}>
        <HStack width="fit-content">
          <NumberEditor
            hideCopyButton
            label="Set score for all players:"
            onChange={(valueAsString, valueAsNumber) => {
              if (Number.isNaN(valueAsNumber)) {
                setScoreToSet(undefined);
              } else {
                setScoreToSet(valueAsNumber);
              }
            }}
            value={scoreToSet || ''}
            w={24}
          />
          <Button
            isDisabled={scoreToSet === undefined}
            onClick={handleSetForAllPlayersClick}
          >
            Set
          </Button>
        </HStack>
      </Box>

      <History
        deleteHistory={deleteHistoryEntries}
        historyEntries={historyEntries}
      />
    </>
  );
}

export default Scoreboard;
