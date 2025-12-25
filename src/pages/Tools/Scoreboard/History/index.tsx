import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Heading,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { HistoryEntry as HistoryEntryType } from '../types';
import HistoryEntry from './HistoryEntry';
import HistoryChart from './HistoryChart';

type Props = {
  deleteHistory: () => void;
  historyEntries: HistoryEntryType[];
};

function History({ deleteHistory, historyEntries }: Props) {
  const {
    colors: { red },
  } = useTheme();

  return (
    <>
      <HStack justifyContent="space-between">
        <Heading as="h2" mt={4} mb={4} size="lg">
          History
        </Heading>
        <Button
          size="sm"
          color={red[500]}
          onClick={deleteHistory}
          leftIcon={<FaTrash />}
        >
          Delete history
        </Button>
      </HStack>

      {historyEntries?.length > 0 && (
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="xl">{isExpanded ? 'Hide' : 'Show'}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <HistoryChart historyEntries={historyEntries} />

                  {historyEntries.map((historyEntry) => (
                    <span key={historyEntry.id}>
                      <HistoryEntry historyEntry={historyEntry} />
                    </span>
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}

export default History;
