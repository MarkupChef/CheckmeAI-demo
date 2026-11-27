'use client';

import '@ant-design/v5-patch-for-react-19';
import ContinueInterview from '@components/ContinueInterview';
import customTheme from '@customTheme.fb';
import i18n from '@i18n';
import store, { serverState } from '@store/index';
import theme from '@themeConfig';
import { App as AntdApp, ConfigProvider } from 'antd';
import { Flowbite } from 'flowbite-react';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store} serverState={serverState}>
      <SessionProvider>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider theme={theme}>
            <AntdApp>
              <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
              <ContinueInterview />
            </AntdApp>
          </ConfigProvider>
        </I18nextProvider>
      </SessionProvider>
    </Provider>
  );
}
