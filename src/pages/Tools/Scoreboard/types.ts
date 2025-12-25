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
  newScore: number;
  player: Player;
  previousScore: number;
} & HistoryEntry;

export type ScoreSet = {
  newScore: number;
  player: Player;
  previousScore: number;
} & HistoryEntry;

export type HistoryEvent = {
  message: string;
} & HistoryEntry;

export function isScoreChange(
  historyEntry: HistoryEntry
): historyEntry is ScoreChange {
  return (
    (historyEntry as any)?.player?.name && (historyEntry as any)?.addedScore
  );
}

export function isScoreSet(
  historyEntry: HistoryEntry
): historyEntry is ScoreChange {
  return (
    (historyEntry as any)?.player?.name &&
    (historyEntry as any)?.newScore &&
    !(historyEntry as any)?.addedScore
  );
}

export function isHistoryEvent(
  historyEntry: HistoryEntry
): historyEntry is HistoryEvent {
  return (historyEntry as any)?.message;
}
