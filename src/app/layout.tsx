import { AntdRegistry } from '@ant-design/nextjs-registry';
import MainLayout from '@layouts/MainLayout';
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { ReactNode } from 'react';
import colors from '../../colors';
import '../styles/style.scss';
import Providers from './providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#222831' },
  },
  manifest: '/site.webmanifest',
  robots: { index: false, follow: false },
  other: { 'msapplication-TileColor': '#da532c' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <NextTopLoader color={colors.orangered} height={3} showSpinner={false} />
        <AntdRegistry>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
