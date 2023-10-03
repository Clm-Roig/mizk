import { useState } from 'react';
import { Player } from './types';

function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', score: 0 },
    { name: 'John', score: 0 },
  ]);

  const addPlayer = (newPlayerName: string) => {
    setPlayers((previousPlayers) => [
      ...previousPlayers,
      { name: newPlayerName.trim(), score: 0 },
    ]);
  };

  const resetPlayersScore = () => {
    setPlayers(
      players.map((p) => ({
        ...p,
        score: 0,
      }))
    );
  };

  const removePlayer = (player: Player) => {
    setPlayers(players.filter((p) => p.name !== player.name));
  };

  const addScoreToPlayer = (toUpdatePlayer: Player, addedScore: number) => {
    const updatedPlayers = players.map((p) => {
      if (p.name === toUpdatePlayer.name) {
        return { ...p, score: p.score + addedScore };
      }
      return p;
    });
    setPlayers(updatedPlayers);
  };

  return {
    addPlayer,
    addScoreToPlayer,
    players,
    resetPlayersScore,
    removePlayer,
    setPlayers,
  };
}

export default usePlayers;
