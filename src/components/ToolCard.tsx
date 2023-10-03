import {
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
import MCard from './MCard';

interface Props extends CardProps {
  tool: Tool;
}

function ToolCard({ tool, ...cardProps }: Props) {
  const {
    colors: { accent, primary },
  } = useTheme();

  return (
    <Link to={tool.url}>
      <MCard
        bg={`linear-gradient(45deg, ${primary[200]}11, ${primary[300]}44)`}
        backdropFilter="blur(14px)"
        _hover={{
          boxShadow: 'lg',
          outline: `2px solid ${accent[100]}`,
        }}
        {...cardProps}
      >
        <CardHeader>
          <HStack>
            <Icon as={tool.type.icon} color="accent.600" />
            <Heading size="md" color="accent.600">
              {tool.name}
            </Heading>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{tool.description}</Text>
        </CardBody>
      </MCard>
    </Link>
  );
}

export default ToolCard;
