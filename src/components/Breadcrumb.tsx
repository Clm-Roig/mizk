import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import useFindCurrentToolByUrl from '../hooks/useFindCurrentToolByUrl';

function Breadcrumb() {
  const location = useLocation();
  const tool = useFindCurrentToolByUrl();
  const splittedNames = [...new Set(location.pathname.split('/'))];
  const breadcrumb = splittedNames.map((name, idx) => {
    let url = '/';
    let cleanedName = name.replace('-', ' ') || 'Home';
    for (let i = 1; i <= idx; i += 1) {
      url += `${splittedNames[i]}/`;
    }
    if (idx === 2) {
      cleanedName = tool?.name || cleanedName;
    }
    return { name: cleanedName, url };
  });

  return (
    <ChakraBreadcrumb
      background="gray.200"
      px={4}
      separator={<FaChevronRight />}
    >
      {breadcrumb.map((item) => (
        <BreadcrumbItem key={item.name}>
          <BreadcrumbLink as={Link} to={item.url}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  );
}

export default Breadcrumb;
