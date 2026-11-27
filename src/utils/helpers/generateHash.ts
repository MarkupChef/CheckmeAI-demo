import { HASH_SALT } from '@utils/constants/environments';
import { createHash } from 'crypto';

function generateHash(userId: string): string {
  const hash = createHash('sha256');
  hash.update(`${userId}${HASH_SALT}${Date.now()}`);

  return hash.digest('hex');
}

export default generateHash;
