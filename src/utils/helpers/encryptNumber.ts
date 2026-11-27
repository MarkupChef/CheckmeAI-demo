import { ALGORITHM } from '@utils/constants/constants';
import { createCipheriv, randomBytes } from 'crypto';

function encryptNumber(number: number, secret: string): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, Buffer.from(secret), iv);
  const encryptedBuffer = Buffer.concat([cipher.update(number.toString()), cipher.final()]);

  return `${iv.toString('hex')}${encryptedBuffer.toString('hex')}`;
}

export default encryptNumber;
