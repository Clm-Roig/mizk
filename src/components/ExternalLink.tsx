import { Link, LinkProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  children: ReactNode;
} & LinkProps;

function ExternalLink({ children, ...linkProps }: Props) {
  return (
    <Link isExternal {...linkProps}>
      {children}
      <FaExternalLinkAlt
        size="0.8rem"
        style={{
          display: 'inline',
          marginLeft: '2px',
          verticalAlign: 'text-top',
        }}
      />
    </Link>
  );
}

export default ExternalLink;
