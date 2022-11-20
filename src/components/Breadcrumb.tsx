import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const splittedNames = [...new Set(location.pathname.split('/'))];
  const breadcrumb = splittedNames.map((name, idx) => {
    let url = '/';
    for (let i = 1; i <= idx; i += 1) {
      url += `${splittedNames[i]}/`;
    }
    return { name: name || 'Home', url };
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
