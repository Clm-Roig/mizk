import { Box, Flex, Tag } from '@chakra-ui/react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  HistoryEntry as HistoryEntryType,
  isScoreChange,
  isScoreSet,
  Player,
} from '../types';
import getDarkerColor from './getDarkerColor';

type Props = {
  historyEntries: HistoryEntryType[];
};

function HistoryChart({ historyEntries }: Props) {
  const scoreChanges = historyEntries.filter(
    (e) => isScoreChange(e) || isScoreSet(e)
  );

  const players = scoreChanges.reduce(
    (currentPlayers: Player[], scoreChange) => {
      if (currentPlayers.some((p) => p.name === scoreChange.player.name)) {
        return currentPlayers;
      }
      return [...currentPlayers, scoreChange.player];
    },
    []
  );

  const dates = [...new Set(scoreChanges.map((entry) => entry.date))].sort(
    (a, b) => new Date(a).valueOf() - new Date(b).valueOf()
  );

  const rechartsData = dates.map((date) => {
    const entry: Record<string, number | string | Date | null> = {
      date: date.toString(),
    };
    players.forEach((player) => {
      const playerEntry = scoreChanges.find(
        (e) => e.player.name === player.name && e.date === date
      );
      entry[player.name] = playerEntry ? playerEntry.newScore : null;
    });
    return entry;
  });

  const formatDate = (tickItem: string): string => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const xAxisTicks = dates
    .filter((date, index) => {
      if (index === 0) return true; // display first date
      const currentDate = new Date(date);
      const previousDate = new Date(dates[index - 1]);
      // Display date only if differente from the previous one
      return (
        currentDate.getHours() !== previousDate.getHours() ||
        currentDate.getMinutes() !== previousDate.getMinutes()
      );
    })
    .map((d) => d.toString());

  // yDomain computation to avoid large empty chart
  const scores = scoreChanges.map((e) => e.newScore);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const padding = Math.max(5, Math.round((maxScore - minScore) * 0.5));
  const yDomain: [number, number] = [
    Math.max(0, minScore - padding),
    maxScore + padding,
  ];

  return (
    <>
      <Flex mb={2} wrap="wrap" gap={2}>
        {players.map((player) => (
          <Tag key={player.name} bg={getDarkerColor(player.color)}>
            {player.name}
          </Tag>
        ))}
      </Flex>
      <Box m="auto" maxWidth={900} height="50vh">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={rechartsData}
            margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelFormatter={(label) => formatDate(label)} />
            <XAxis
              dataKey="date"
              ticks={xAxisTicks}
              tickFormatter={formatDate}
              padding="gap"
            />
            <YAxis domain={yDomain} width={20} />
            {players.map((player) => (
              <Line
                key={player.name}
                type="linear"
                dataKey={player.name}
                stroke={getDarkerColor(player.color)}
                strokeWidth={2}
                connectNulls
                dot={{
                  fill: getDarkerColor(player.color),
                  strokeWidth: 2,
                  r: 4,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default HistoryChart;
