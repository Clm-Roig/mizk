export type Player = {
  name: string;
  score: number;
};

export type ScoreModification = {
  addedScore: number;
  date: Date;
  id: string;
  newScore: number;
  playerName: Player['name'];
  previousScore: number;
};
