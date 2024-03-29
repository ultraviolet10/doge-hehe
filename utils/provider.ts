import { Dispatch } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';

import { ALCHEMY_API_KEY, ALCHEMY_URL, ETHEREUM_NETWORK } from '@config/config';
import { StoreActions, StoreActionTypes, StoreState } from '@type/store';

import { CONSTANTS } from './constants';

const DC_CHAIN_ID = CONSTANTS.DC_CHAIN_ID;

export const configMetamask = async (
  dispatch: Dispatch<StoreActions>
): Promise<StoreState> => {
  const metamaskProvider = await detectEthereumProvider();
  let provider: providers.AlchemyProvider | providers.Web3Provider;

  if (metamaskProvider) {
    // metamask
    provider = new providers.Web3Provider(metamaskProvider);
  } else {
    provider = new providers.AlchemyProvider(ETHEREUM_NETWORK, ALCHEMY_API_KEY);
  }

  const { chainId } = await provider.getNetwork();

  if (chainId !== DC_CHAIN_ID) {
    return { provider: undefined, account: undefined };
  }

  dispatch({
    type: StoreActionTypes.SET_PROVIDER,
    payload: {
      provider,
    },
  });

  const accounts = await provider.send('eth_requestAccounts', []);

  dispatch({
    type: StoreActionTypes.SET_ACCOUNT,
    payload: { account: accounts[0] },
  });

  return { provider, account: accounts[0] };
};

export const configWalletConnect = async (
  dispatch: Dispatch<StoreActions>
): Promise<StoreState> => {
  const wcProvider = new WalletConnectProvider({
    rpc: { 3: `${ALCHEMY_URL}${ALCHEMY_API_KEY}` },
  });

  // Enable session (triggers QR Code modal)
  await wcProvider.enable();

  const provider = new providers.Web3Provider(wcProvider);

  dispatch({
    type: StoreActionTypes.SET_PROVIDER,
    payload: { provider },
  });

  const accounts = await provider.listAccounts();

  dispatch({
    type: StoreActionTypes.SET_ACCOUNT,
    payload: { account: accounts[0] },
  });

  return { provider, account: accounts[0] };
};
