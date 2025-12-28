import { act } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { renderHook } from '@testing-library/react';
import useHistoryEntries from './useHistoryEntries';
import {
  getNewScore,
  HistoryEvent,
  isAScoreChange,
  isAScoreEntry,
  isAScoreSet,
  ScoreChange,
  ScoreEntry,
  ScoreSet,
} from '../types';

const player = {
  color: '#ff0000',
  name: 'John',
  score: 0,
};

describe('useHistoryEntries', () => {
  const setup = () => renderHook(() => useHistoryEntries());
  test('should have no history entries when created', () => {
    const { result: hook } = setup();
    expect(hook.current.historyEntries.length).toBe(0);
  });

  test('should add an history event with the provided message', () => {
    const { result: hook } = setup();
    const historyMsg = 'testing history event';
    act(() => {
      hook.current.addHistoryEvent(historyMsg);
    });
    expect((hook.current.historyEntries[0] as HistoryEvent).message).toBe(
      historyMsg
    );
  });

  test('should add a score change with the correct score values', () => {
    const { result: hook } = setup();
    const previousScore = 2;
    const addedScore = 3;
    act(() => {
      hook.current.addScoreEntry({
        addedScore,
        previousScore,
        player,
        date: new Date(),
        id: uuidv4(),
      });
    });
    const entry = hook.current.historyEntries[0];
    expect(isAScoreEntry(entry)).toBeTruthy();
    expect(isAScoreChange(entry)).toBeTruthy();
    expect((entry as ScoreChange).addedScore).toBe(addedScore);
    expect((entry as ScoreChange).previousScore).toBe(previousScore);
    expect(getNewScore(entry as ScoreEntry)).toBe(previousScore + addedScore);
  });

  test('should add a score set with the correct score values', () => {
    const { result: hook } = setup();
    const previousScore = 2;
    const newScore = 3;
    act(() => {
      hook.current.addScoreEntry({
        newScore,
        previousScore,
        player,
        date: new Date(),
        id: uuidv4(),
      });
    });
    const entry = hook.current.historyEntries[0];
    expect(isAScoreEntry(entry)).toBeTruthy();
    expect(isAScoreSet(entry)).toBeTruthy();
    expect((entry as ScoreSet).previousScore).toBe(previousScore);
    expect((entry as ScoreSet).newScore).toBe(newScore);
    expect(getNewScore(entry as ScoreEntry)).toBe(newScore);
  });
});
