import { useLocation } from 'react-router-dom';
import tools from '../data/tools';

function useFindCurrentToolByUrl() {
  const location = useLocation();
  const tool = tools.find((t) => t.url === location.pathname);
  return tool;
}

export default useFindCurrentToolByUrl;
