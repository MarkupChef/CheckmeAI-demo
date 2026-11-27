import PersistedStateGate from '@components/PersistedStateGate';
import { ReactNode } from 'react';

export default function JobVacancyReviewLayout({ children }: { children: ReactNode }) {
  return <PersistedStateGate>{children}</PersistedStateGate>;
}
