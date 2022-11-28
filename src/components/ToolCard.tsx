import {
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  HStack,
  Icon,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Tool } from '../models/Tool';

interface Props extends CardProps {
  tool: Tool;
}

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
            <Icon as={tool.type.icon} color="accent.600" />
            <Heading size="md">{tool.name}</Heading>
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
