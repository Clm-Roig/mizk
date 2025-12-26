import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Button,
  CardBody,
  CardHeader,
  Flex,
  FormLabel,
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
import getStringToColor from './getStringToColor';
import MCard from '../../../components/MCard';
import {
  isAScoreChange,
  isAScoreEntry,
  isAScoreSet,
  Player,
  ScoreChange,
  ScoreEntry,
  ScoreSet,
} from './types';
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
  const [pendingHistoryEntries, setPendingHistoryEntries] = useState<
    Array<ScoreEntry>
  >([]);
  const debouncedHistoryEntries = useDebounce(pendingHistoryEntries, 1000);
  const {
    addPlayer,
    addScoreToPlayer,
    players,
    removePlayer,
    setScoreForAllPlayers,
  } = usePlayers();
  const {
    addHistoryEvent,
    addScoreEntry,
    deleteHistoryEntries,
    historyEntries,
  } = useHistoryEntries();
  const [selectedSortType, setSelectedSortType] = useState<SortType>(
    sortTypes[0]
  );
  const [scoreToSet, setScoreToSet] = useState<number | string | undefined>(10);

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
    // Wait for debouncing before adding to the history
    setPendingHistoryEntries((prev) => [
      ...prev,
      {
        addedScore,
        date: new Date(),
        id: uuidv4(),
        player: { ...toUpdatePlayer },
        previousScore: toUpdatePlayer.score,
      },
    ]);
    // Immediately add score to player
    addScoreToPlayer(toUpdatePlayer, addedScore);
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

  const handleSetForAllPlayersClick = (e: FormEvent) => {
    e.preventDefault();
    const n = Number(scoreToSet);
    const scoreNumber = Number.isNaN(n) ? null : Number(scoreToSet);
    if (scoreToSet !== '' && scoreNumber !== null) {
      const date = new Date();
      players.forEach((p) => {
        setPendingHistoryEntries((prev) => [
          ...prev,
          {
            date,
            id: uuidv4(),
            newScore: scoreNumber,
            player: p,
            previousScore: p.score,
          },
        ]);
      });
      setScoreForAllPlayers(scoreNumber);
    }
  };

  // Apply debounced score changes to the history
  useEffect(() => {
    if (debouncedHistoryEntries?.length > 0) {
      const aggScoreEntries = [...debouncedHistoryEntries] // to avoid mutation by sort()
        .sort((sc1, sc2) => sc1.date.getTime() - sc2.date.getTime())
        .reduce((result: Array<ScoreChange | ScoreSet>, currHistoryEntry) => {
          const isScoreSet = isAScoreSet(currHistoryEntry);
          const isScoreChange = isAScoreChange(currHistoryEntry);
          if (!isAScoreEntry(currHistoryEntry)) return result;

          const historyEntryPlayerIdx = result.findIndex(
            (he) =>
              he.player.name === currHistoryEntry.player.name &&
              ((isScoreSet && isAScoreSet(he)) ||
                (isScoreChange && isAScoreChange(he)))
          );

          // No score changes / sets for this player: create a new scoreChange / scoreSet
          if (historyEntryPlayerIdx === -1) {
            return [...result, currHistoryEntry];
          }

          // A score set exists for this player: aggregate them.
          if (isScoreSet) {
            const playerScoreSet = result[historyEntryPlayerIdx] as ScoreSet;
            return [
              ...result.filter((_, idx) => idx !== historyEntryPlayerIdx),
              {
                ...playerScoreSet,
                id: uuidv4(),
                newScore: currHistoryEntry.newScore,
                previousScore: playerScoreSet.previousScore,
              },
            ];
          }

          // A score change exists for this player: aggregate them.
          if (isScoreChange) {
            const playerScoreChange = result[
              historyEntryPlayerIdx
            ] as ScoreChange;
            return [
              ...result.filter((_, idx) => idx !== historyEntryPlayerIdx),
              {
                ...playerScoreChange,
                id: uuidv4(),
                addedScore:
                  playerScoreChange.addedScore + currHistoryEntry.addedScore,
                previousScore: playerScoreChange.previousScore,
              },
            ];
          }
          return result;
        }, []);

      const date = new Date(); // set same date for all changes
      aggScoreEntries
        .map((sc) => ({ ...sc, date }))
        .filter(
          (sc) => isAScoreSet(sc) || (isAScoreChange(sc) && sc.addedScore !== 0)
        ) // remove empty addedScore (happens when user press +1 then -1)
        .forEach((sc) => addScoreEntry(sc));

      // Remove treated entries
      setPendingHistoryEntries((entries) =>
        entries.filter((entry) =>
          debouncedHistoryEntries.every((dEntry) => dEntry.id !== entry.id)
        )
      );
    }
  }, [addScoreEntry, debouncedHistoryEntries]);

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
            backgroundColor={getStringToColor(player.name)}
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
                  height={{ base: '48px', md: '72px' }}
                  width={{ base: '48px', md: '72px' }}
                />
                <Text fontSize="4xl" px={6}>
                  {player.score}
                </Text>
                <IconButton
                  icon={<FaPlus />}
                  aria-label="increase score"
                  onClick={() => handleAddScore(player, 1)}
                  height={{ base: '48px', md: '72px' }}
                  width={{ base: '48px', md: '72px' }}
                />
              </HStack>
            </CardBody>
          </MCard>
        ))}
      </SimpleGrid>

      <Flex gap={4} flexDir={{ base: 'column', md: 'row' }}>
        <Flex flex={1}>
          <NewPlayerForm
            onAddPlayer={handleAddPlayer}
            isNewPlayerNameValid={isNewPlayerNameValid}
          />
        </Flex>
        <Flex flex={1} flexDir="column">
          <form onSubmit={handleSetForAllPlayersClick}>
            <FormLabel>Set score for all players</FormLabel>
            <HStack width="fit-content">
              <NumberEditor
                hideCopyButton
                inputMode="numeric"
                onChange={(valueAsString) => {
                  const integerOnly = valueAsString
                    .replace(/[^0-9-]/g, '') // numbers only
                    .replace(/(?!^)-/g, ''); // negative sign at the beginning allowed
                  setScoreToSet(integerOnly);
                }}
                value={scoreToSet === 0 ? 0 : scoreToSet ?? ''}
                w={24}
              />
              <Button
                isDisabled={
                  scoreToSet === undefined ||
                  scoreToSet === null ||
                  scoreToSet === ''
                }
                type="submit"
              >
                Set
              </Button>
            </HStack>
          </form>
        </Flex>
      </Flex>

      <History
        deleteHistory={deleteHistoryEntries}
        historyEntries={historyEntries}
      />
    </>
  );
}

export default Scoreboard;
