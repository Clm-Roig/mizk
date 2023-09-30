import { FormEvent, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  useTheme,
} from '@chakra-ui/react';
import {
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
} from 'react-icons/fa';
import stringToColor from './stringToColor';
import MCard from '../../../components/MCard';
import { Player, ScoreModification } from './types';
import { formatTimeToHHMMSS } from '../../../components/ToolSearchBar/utils';
import SortMenu, { SortType } from '../../../components/SortMenu';

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
    colors: { accent, red },
  } = useTheme();
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', score: 0 },
    { name: 'John', score: 0 },
  ]);
  const [selectedSortType, setSelectedSortType] = useState<SortType>(
    sortTypes[0]
  );
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [scoreModifications, setScoreModifications] = useState<
    ScoreModification[]
  >([]);

  const isNewPlayerNameValid = players.every(
    (p) => p.name.toLowerCase() !== newPlayerName.toLowerCase()
  );

  const onAddPlayer = () => {
    if (isNewPlayerNameValid) {
      setPlayers((previousPlayers) => [
        ...previousPlayers,
        { name: newPlayerName.trim(), score: 0 },
      ]);
      setNewPlayerName('');
    }
  };

  const addScore = (toUpdatePlayer: Player, addedScore: number) => {
    const updatedPlayers = players.map((p) => {
      if (p.name === toUpdatePlayer.name) {
        return { ...p, score: p.score + addedScore };
      }
      return p;
    });
    setPlayers(updatedPlayers);
    setScoreModifications((prevScoreHistory) => [
      {
        addedScore,
        date: new Date(),
        id: uuidv4(),
        playerName: toUpdatePlayer.name,
        previousScore: toUpdatePlayer.score,
        newScore: toUpdatePlayer.score + addedScore,
      },
      ...prevScoreHistory,
    ]);
  };

  const removePlayer = (player: Player) => {
    const otherPlayers = players.filter((p) => p.name !== player.name);
    setPlayers(otherPlayers);
  };

  const deleteScoreModifications = () => {
    setScoreModifications([]);
  };

  const handleOnChangeSortType = (newSortType: SortType) => {
    if (newSortType.id !== selectedSortType.id) {
      setSelectedSortType(newSortType);
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
        <SortMenu
          onChangeSortType={handleOnChangeSortType}
          selectedSortType={selectedSortType}
          sortTypes={sortTypes}
        />
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
                onClick={() => removePlayer(player)}
              />
            </CardHeader>
            <CardBody>
              <HStack>
                <IconButton
                  icon={<FaMinus />}
                  aria-label="decrease score"
                  onClick={() => addScore(player, -1)}
                  size="sm"
                  variant="ghost"
                />
                <Text fontSize="4xl" px={6}>
                  {player.score}
                </Text>
                <IconButton
                  icon={<FaPlus />}
                  aria-label="increase score"
                  onClick={() => addScore(player, 1)}
                  size="sm"
                  variant="ghost"
                />
              </HStack>
            </CardBody>
          </MCard>
        ))}
      </SimpleGrid>

      <form onSubmit={onAddPlayer}>
        <FormControl isInvalid={!isNewPlayerNameValid}>
          <FormLabel>New player name</FormLabel>
          <HStack>
            <Input
              isInvalid={!isNewPlayerNameValid}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setNewPlayerName(e.currentTarget.value)
              }
              required
              value={newPlayerName}
            />

            {isNewPlayerNameValid && newPlayerName.trim() && (
              <Button type="submit" leftIcon={<FaPlus />}>
                Add player
              </Button>
            )}
          </HStack>
          {!isNewPlayerNameValid && (
            <FormErrorMessage>
              A player with this name already exists.
            </FormErrorMessage>
          )}
        </FormControl>
      </form>

      <HStack justifyContent="space-between">
        <Heading as="h2" mt={4} mb={4} size="lg">
          Score history
        </Heading>
        <Button size="sm" color={red[500]} onClick={deleteScoreModifications}>
          Delete history
        </Button>
      </HStack>
      {scoreModifications?.length > 0 && (
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Show
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {scoreModifications.map((scoreModification) => {
                const {
                  addedScore,
                  date,
                  id,
                  newScore,
                  playerName,
                  previousScore,
                } = scoreModification;
                const verb = addedScore > 0 ? ' added to' : ' deducted from';
                const plural = Math.abs(addedScore) > 1 && 's';
                return (
                  <span key={id}>
                    <HStack>
                      <Text>
                        <b>{Math.abs(addedScore)}</b> point{plural} {verb}{' '}
                        <b>{playerName}</b> ({previousScore}{' '}
                        <Icon as={FaArrowRight} boxSize={2} /> {newScore})
                      </Text>
                      <Text fontSize="xs" as="sub" color={accent[400]}>
                        {formatTimeToHHMMSS(date)}
                      </Text>
                    </HStack>
                  </span>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}

export default Scoreboard;
