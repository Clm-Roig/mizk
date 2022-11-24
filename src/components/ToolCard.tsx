import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  HStack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tool } from '../models/Tool';

interface Props extends CardProps {
  tool: Tool;
}

const getInitials = (type: string) => type.slice(0, 2);

function ToolCard({ tool, ...cardProps }: Props) {
  const theme = useTheme();
  // eslint-disable-next-line no-underscore-dangle
  const borderColor = theme.__cssVars['--chakra-colors-primary-200'];
  return (
    <Link to={tool.url}>
      <Card
        bg="linear-gradient(180deg, rgba(180, 180, 200, 0.12), rgba(100, 100, 150, 0.12))"
        backdropFilter="blur(14px)"
        _hover={{
          boxShadow: 'lg',
          outline: `2px solid ${borderColor}`,
        }}
        outline="2px solid transparent"
        size="sm"
        transitionDuration="faster"
        {...cardProps}
      >
        <CardHeader>
          <HStack>
            <Heading size="md">{tool.name}</Heading>
            <Avatar size="sm" name={tool.type.name} getInitials={getInitials} />
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{tool.description}</Text>
        </CardBody>
      </Card>
    </Link>
  );
}

export default ToolCard;
