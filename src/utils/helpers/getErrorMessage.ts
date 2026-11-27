import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string | undefined {
  if (error && 'data' in error) {
    const data = error.data as { message: string; error: string };

    const message = data.message || data.error;

    if (message) {
      return message;
    }
  }

  return;
}

export default getErrorMessage;
