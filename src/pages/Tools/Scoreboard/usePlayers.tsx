import { useState } from 'react';
import { Player } from './types';
import getStringToColor from './getStringToColor';

function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([
    { color: getStringToColor('Clément'), name: 'Clément', score: 0 },
    { color: getStringToColor('Jean-Louis'), name: 'Jean-Louis', score: 0 },
  ]);

  const addPlayer = (newPlayerName: string) => {
    setPlayers((previousPlayers) => [
      ...previousPlayers,
      {
        color: getStringToColor(newPlayerName.trim()),
        name: newPlayerName.trim(),
        score: 0,
      },
    ]);
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

  const setScoreForAllPlayers = (newScore: number) => {
    setPlayers(
      players.map((p) => ({
        ...p,
        score: newScore,
      }))
    );
  };

  return {
    addPlayer,
    addScoreToPlayer,
    players,
    removePlayer,
    setPlayers,
    setScoreForAllPlayers,
  };
}

export default usePlayers;
