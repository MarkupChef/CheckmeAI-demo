import { NODE_CACHED_STD_TTL, NODE_CHECKPERIOD } from '@utils/constants/constants';
import NodeCache from 'node-cache';

export const CACHE_TOPICS_KEY = 'topics';

const myCache = new NodeCache({
  stdTTL: NODE_CACHED_STD_TTL,
  checkperiod: NODE_CHECKPERIOD,
});

export default myCache;
