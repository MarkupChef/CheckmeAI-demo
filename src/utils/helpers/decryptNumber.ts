import { ALGORITHM } from '@utils/constants/constants';
import { createDecipheriv } from 'crypto';

function decryptNumber(encryptedNumber: string, secret: string): number {
  try {
    const iv = Buffer.from(encryptedNumber.slice(0, 32), 'hex');
    const encryptedData = Buffer.from(encryptedNumber.slice(32), 'hex');
    const decipher = createDecipheriv(ALGORITHM, Buffer.from(secret), iv);
    const decryptedBuffer = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    return parseInt(decryptedBuffer.toString(), 10);
  } catch (error: any) {
    throw new Error(`Error decrypting number: ${error.message}`);
  }
}

export default decryptNumber;
