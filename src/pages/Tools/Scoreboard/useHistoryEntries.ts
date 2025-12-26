import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HistoryEntry, ScoreEntry } from './types';

function useHistoryEntries() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  const addScoreEntry = useCallback((scoreEntry: ScoreEntry) => {
    setHistoryEntries((prevHistoryEntries) => [
      scoreEntry,
      ...prevHistoryEntries,
    ]);
  }, []);

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
    addScoreEntry,
    deleteHistoryEntries,
    historyEntries,
    setHistoryEntries,
  };
}

export default useHistoryEntries;
