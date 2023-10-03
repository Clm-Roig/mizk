export type Player = {
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
  playerName: Player['name'];
  previousScore: number;
} & HistoryEntry;

export type HistoryEvent = {
  message: string;
} & HistoryEntry;

export function isScoreChange(
  historyEntry: HistoryEntry
): historyEntry is ScoreChange {
  return (historyEntry as any)?.playerName && (historyEntry as any)?.addedScore;
}

export function isHistoryEvent(
  historyEntry: HistoryEntry
): historyEntry is HistoryEvent {
  return (historyEntry as any)?.message;
}
