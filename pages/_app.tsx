import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { ModalProvider } from '@contexts/modal';
import { WalletProvider } from '@contexts/wallet';
import { Web3Provider } from '@ethersproject/providers';
import { StoreProvider } from '@store/store';
import { Web3ReactProvider } from '@web3-react/core';

import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
  }

  return (
    <StoreProvider>
      <ModalProvider>
        <WalletProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Head>
              <title>HeheDoge</title>
              <link rel="icon" href="/doge.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <Script
              src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
              strategy="beforeInteractive"
            />
            <Component {...pageProps} />
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
          </Web3ReactProvider>
        </WalletProvider>
      </ModalProvider>
    </StoreProvider>
  );
};

export default MyApp;
