import { HASH_SALT } from '@utils/constants/environments';
import { createHash } from 'crypto';

function generateEmailHash(email: string): string {
  const hash = createHash('sha256');
  hash.update(`${email.toLowerCase()}${HASH_SALT}`);

  return hash.digest('hex');
}

export default generateEmailHash;
