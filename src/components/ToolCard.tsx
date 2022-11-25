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
  const {
    colors: { accent, primary },
  } = useTheme();

  return (
    <Link to={tool.url}>
      <Card
        bg={`linear-gradient(45deg, ${primary[100]}11, ${primary[100]}44)`}
        backdropFilter="blur(14px)"
        _hover={{
          boxShadow: 'lg',
          outline: `2px solid ${accent[100]}`,
        }}
        outline="2px solid transparent"
        size="sm"
        transitionDuration="fast"
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
