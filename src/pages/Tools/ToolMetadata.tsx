import { Helmet } from 'react-helmet';
import useFindCurrentToolByUrl from '../../hooks/useFindCurrentToolByUrl';

/**
 * Set Metadata if a tool is currently loaded using the url
 */
function ToolMetadata() {
  const tool = useFindCurrentToolByUrl();
  if (!tool) return null;
  return (
    <Helmet>
      <title>{tool.name}</title>
      <meta name="description" content={tool.description} />
    </Helmet>
  );
}

export default ToolMetadata;
