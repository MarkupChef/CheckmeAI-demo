import PersistedStateGate from '@components/PersistedStateGate';
import { ReactNode } from 'react';

export default function InterviewLayout({ children }: { children: ReactNode }) {
  return <PersistedStateGate>{children}</PersistedStateGate>;
}
