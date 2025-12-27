import { ReactNode } from 'react';
import { HStack, Icon, Stack, Text, useTheme } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import {
  HistoryEntry as HistoryEntryType,
  HistoryEvent,
  isAScoreChange,
  isHistoryEvent,
  isAScoreSet,
  getNewScore,
  isAScoreEntry,
} from '../types';
import { formatTimeToHHMMSS } from '../../../../components/ToolSearchBar/utils';

type Props = {
  historyEntry: HistoryEntryType;
};

function DateComponent({ date }: { date: Date }) {
  const {
    colors: { accent },
  } = useTheme();
  return (
    <Text fontSize="xs" color={accent[400]}>
      {formatTimeToHHMMSS(date)}
    </Text>
  );
}

function ScoreEntryWrapper({ children }: { children: ReactNode }) {
  return (
    <Stack
      align="baseline"
      direction={{ base: 'column', sm: 'row' }}
      gap={{ base: '0', sm: '8px' }}
    >
      {children}
    </Stack>
  );
}

function HistoryEntry({ historyEntry }: Props) {
  if (isAScoreEntry(historyEntry)) {
    if (isAScoreChange(historyEntry)) {
      const {
        addedScore,
        date,
        player: { name },
        previousScore,
      } = historyEntry;
      const sign = addedScore > 0 ? '+' : '';
      const plural = Math.abs(addedScore) > 1 && 's';
      const newScore = getNewScore(historyEntry);
      return (
        <ScoreEntryWrapper>
          <Text>
            <b style={{ color: addedScore > 0 ? 'green' : 'red' }}>
              {sign}
              {addedScore}
            </b>{' '}
            point{plural} to <b>{name}</b> ({previousScore}{' '}
            <Icon as={FaArrowRight} boxSize={2.5} /> {newScore})
          </Text>
          <DateComponent date={date} />
        </ScoreEntryWrapper>
      );
    }
    if (isAScoreSet(historyEntry)) {
      const {
        date,
        newScore,
        player: { name },
        previousScore,
      } = historyEntry;
      const plural = Math.abs(newScore) > 1 && 's';
      return (
        <ScoreEntryWrapper>
          <Text>
            <b>{name}</b>
            {`'s `}
            score set to {newScore} point{plural} ({previousScore}
            <Icon as={FaArrowRight} boxSize={2.5} />
            {newScore})
          </Text>
          <DateComponent date={date} />
        </ScoreEntryWrapper>
      );
    }
  }
  if (isHistoryEvent(historyEntry)) {
    const { date, message } = historyEntry as HistoryEvent;
    return (
      <HStack>
        <Text dangerouslySetInnerHTML={{ __html: message }} />
        <DateComponent date={date} />
      </HStack>
    );
  }

  return null;
}

export default HistoryEntry;
