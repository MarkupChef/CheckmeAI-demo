'use client';

import LoadingIcon from '@components/Icons/LoadingIcon';
import { persistor } from '@store/index';
import { PropsWithChildren } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

// for routes that read saved state on mounting, so they are rendered only on the client
const PersistedStateGate = ({ children }: PropsWithChildren) => (
  <PersistGate
    loading={
      <div className={'flex grow items-center justify-center py-10'}>
        <LoadingIcon />
      </div>
    }
    persistor={persistor}
  >
    {children}
  </PersistGate>
);

export default PersistedStateGate;
