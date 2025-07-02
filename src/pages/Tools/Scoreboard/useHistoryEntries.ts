import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HistoryEntry, Player } from './types';

function useHistoryEntries() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  const addScoreChange = useCallback(
    (addedScore: number, toUpdatePlayer: Player) => {
      setHistoryEntries((prevHistoryEntries) => [
        {
          addedScore,
          date: new Date(),
          id: uuidv4(),
          playerName: toUpdatePlayer.name,
          previousScore: toUpdatePlayer.score,
          newScore: toUpdatePlayer.score + addedScore,
        },
        ...prevHistoryEntries,
      ]);
    },
    []
  );

  const addScoreSet = useCallback(
    (newScore: number, toUpdatePlayer: Player) => {
      setHistoryEntries((prevHistoryEntries) => [
        {
          date: new Date(),
          id: uuidv4(),
          playerName: toUpdatePlayer.name,
          previousScore: toUpdatePlayer.score,
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
