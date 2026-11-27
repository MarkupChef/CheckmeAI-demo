import { MAX_FAILED_ATTEMPTS } from '@utils/constants/constants';

const LOCKOUT_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

interface UserAttemptData {
  failedAttempts: number;
  lastAttemptTimestamp: number;
}

const userAttemptsCache = new Map<string, UserAttemptData>();

export function checkLockStatus(userId: string): { isLocked: boolean; unlockTime: number | null } {
  const data = userAttemptsCache.get(userId);

  if (!data) {
    return { isLocked: false, unlockTime: null };
  }

  if (data.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    const timeElapsed = Date.now() - data.lastAttemptTimestamp;

    // Locking is active (24 hours are not expired)
    if (timeElapsed < LOCKOUT_DURATION_MS) {
      return {
        isLocked: true,
        unlockTime: data.lastAttemptTimestamp + LOCKOUT_DURATION_MS,
      };
    } else {
      // 24 hours are expired
      userAttemptsCache.delete(userId);
    }
  }

  return { isLocked: false, unlockTime: null };
}

export function resetAttempts(userId: string): void {
  userAttemptsCache.delete(userId);
}

export function recordFailure(userId: string): void {
  const data = userAttemptsCache.get(userId) || { failedAttempts: 0, lastAttemptTimestamp: 0 };

  data.failedAttempts += 1;
  data.lastAttemptTimestamp = Date.now();
  userAttemptsCache.set(userId, data);
}

export function getFailedAttempts(userId: string): number {
  const data = userAttemptsCache.get(userId) || 0;

  return data ? data.failedAttempts : 0;
}
