import useIsMounted from '@hooks/useIsMounted';
import { useMediaQuery } from 'react-responsive';

// the server doesn't know the screen size, so the query is applied only after mounting
const useClientMediaQuery = (query: string) => {
  const isMounted = useIsMounted();
  const matches = useMediaQuery({ query });

  return isMounted && matches;
};

export default useClientMediaQuery;
