import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HistoryEntry, ScoreChange, ScoreSet } from './types';

function useHistoryEntries() {
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);
  const addScoreChange = useCallback((scoreChange: ScoreChange) => {
    setHistoryEntries((prevHistoryEntries) => [
      scoreChange,
      ...prevHistoryEntries,
    ]);
  }, []);

  const addScoreSet = useCallback((scoreSet: ScoreSet) => {
    setHistoryEntries((prevHistoryEntries) => [
      scoreSet,
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
    addScoreChange,
    addScoreSet,
    deleteHistoryEntries,
    historyEntries,
    setHistoryEntries,
  };
}

export default useHistoryEntries;
