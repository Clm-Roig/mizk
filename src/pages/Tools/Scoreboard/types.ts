export type Player = {
  color: string;
  name: string;
  score: number;
};

export type HistoryEntry = {
  date: Date;
  id: string;
};

export type ScoreChange = {
  addedScore: number;
  player: Player;
  previousScore: number;
} & HistoryEntry;

export type ScoreSet = {
  newScore: number;
  player: Player;
  previousScore: number;
} & HistoryEntry;

export type ScoreEntry = ScoreSet | ScoreChange;

export type HistoryEvent = {
  message: string;
} & HistoryEntry;

export function isAScoreChange(
  historyEntry: HistoryEntry
): historyEntry is ScoreChange {
  return (
    !!(historyEntry as any)?.player?.name && !!(historyEntry as any)?.addedScore
  );
}

export function isAScoreSet(
  historyEntry: HistoryEntry
): historyEntry is ScoreSet {
  return (
    !!(historyEntry as any)?.player?.name && !!(historyEntry as any)?.newScore
  );
}

export function isAScoreEntry(
  historyEntry: HistoryEntry
): historyEntry is ScoreEntry {
  return isAScoreChange(historyEntry) || isAScoreSet(historyEntry);
}

export function isHistoryEvent(
  historyEntry: HistoryEntry
): historyEntry is HistoryEvent {
  return !!(historyEntry as any)?.message;
}

export function getNewScore(scoreEntry: ScoreEntry) {
  if (isAScoreChange(scoreEntry)) {
    return scoreEntry.previousScore + scoreEntry.addedScore;
  }
  return scoreEntry.newScore;
}
