import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HistoryEntry, Player } from './types';

function useHistoryEntries() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  const addScoreChange = useCallback(
    ({
      addedScore,
      playerName,
      previousScore,
    }: {
      addedScore: number;
      playerName: Player['name'];
      previousScore: Player['score'];
    }) => {
      setHistoryEntries((prevHistoryEntries) => [
        {
          addedScore,
          date: new Date(),
          id: uuidv4(),
          playerName,
          previousScore,
          newScore: previousScore + addedScore,
        },
        ...prevHistoryEntries,
      ]);
    },
    []
  );

  const addScoreSet = useCallback(
    ({
      newScore,
      playerName,
      previousScore,
    }: {
      newScore: number;
      playerName: Player['name'];
      previousScore: Player['score'];
    }) => {
      setHistoryEntries((prevHistoryEntries) => [
        {
          date: new Date(),
          id: uuidv4(),
          playerName,
          previousScore,
          newScore,
        },
        ...prevHistoryEntries,
      ]);
    },
    []
  );

  const addHistoryEvent = useCallback((message: string) => {
    setHistoryEntries((prevHistoryEntries) => [
      {
        date: new Date(),
        id: uuidv4(),
        message,
      },
      ...prevHistoryEntries,
    ]);
  }, []);

  const deleteHistoryEntries = () => {
    setHistoryEntries([]);
  };

  return {
    addHistoryEvent,
    addScoreChange,
    addScoreSet,
    deleteHistoryEntries,
    historyEntries,
    setHistoryEntries,
  };
}

export default useHistoryEntries;
