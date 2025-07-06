import {
  Icon,
  ListItem,
  Tooltip as ChakraTooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { FaQuestionCircle } from 'react-icons/fa';

function Tooltip() {
  return (
    <ChakraTooltip
      label={
        <UnorderedList styleType="circle">
          <ListItem mb={2}>
            You can use various units:
            <UnorderedList>
              <ListItem>days (24h) ➡ day / days</ListItem>
              <ListItem>hours ➡ h / hs / hour / hours</ListItem>
              <ListItem>minutes ➡ m / min / mins / minute / minutes</ListItem>
              <ListItem>seconds ➡ s / sec / second / seconds</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem mb={2}>
            Input example: 3days + 2h - 25min + 1day + 20sec
          </ListItem>
          <ListItem mb={2}>
            Spaces and line breaks are ignored: feel free to format your
            calculation as you want!
          </ListItem>
          <ListItem mb={2}>
            If you don&apos;t provide any unit, values are treated as seconds
            (ex: 3 + 5 = 8s).
          </ListItem>
        </UnorderedList>
      }
    >
      <span>
        <Icon as={FaQuestionCircle} boxSize={4} verticalAlign="top" />
      </span>
    </ChakraTooltip>
  );
}

export default Tooltip;
