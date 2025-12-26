import { HStack, Icon, Text, useTheme } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import {
  HistoryEntry as HistoryEntryType,
  HistoryEvent,
  isAScoreChange,
  isHistoryEvent,
  isAScoreSet,
  getNewScore,
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

function HistoryEntry({ historyEntry }: Props) {
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
      <HStack>
        <HStack>
          <Text color={addedScore > 0 ? 'green' : 'red'}>
            <b>
              {sign}
              {addedScore}
            </b>{' '}
          </Text>
          <Text>
            point{plural} to <b>{name}</b> ({previousScore}{' '}
          </Text>
          <Icon as={FaArrowRight} boxSize={2.5} />
          <Text>{newScore})</Text>
        </HStack>
        <DateComponent date={date} />
      </HStack>
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
      <HStack>
        <HStack>
          <Text>
            <b>{name}</b>
            {`'s `}
            score set to {newScore} point{plural} ({previousScore}
          </Text>
          <Icon as={FaArrowRight} boxSize={2.5} />
          <Text>{newScore})</Text>
        </HStack>
        <DateComponent date={date} />
      </HStack>
    );
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
