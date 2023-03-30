import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { ModalProvider } from '@contexts/modal';
import { WalletProvider } from '@contexts/wallet';
import { StoreProvider } from '@store/store';
import { Analytics } from '@vercel/analytics/react';

import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <ModalProvider>
        <WalletProvider>
          <Head>
            <title>HeheDoge</title>
            <link rel="icon" href="/doge.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta property="og:title" content="HeheDoge" />
            <meta
              property="og:description"
              content="Much jokes!! Very Hehe!!"
            />
            <meta
              property="og:image"
              content={'/img/landing_social_hehe.jpeg'}
            />
          </Head>
          <Script
            src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
            strategy="beforeInteractive"
          />
          <Component {...pageProps} />
          <Analytics />
          <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
        </WalletProvider>
      </ModalProvider>
    </StoreProvider>
  );
};

export default MyApp;
