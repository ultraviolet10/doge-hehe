import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { utils } from 'ethers';

import { useModal } from '@contexts/modal';
import { useStore } from '@store/store';
import { WalletType } from '@type/common';
import { StoreActionTypes } from '@type/store';
import { configMetamask, configWalletConnect } from '@utils/provider';

interface WalletModalProps {} // eslint-disable-line

const WalletModal: React.FC<WalletModalProps> = () => {
  const { dispatch } = useStore();
  const { hideModal } = useModal();

  const handleConnectWallet = useCallback(
    async (wallet: WalletType) => {
      try {
        const { account, provider } =
          wallet === WalletType.WALLET_CONNECT
            ? await configWalletConnect(dispatch)
            : await configMetamask(dispatch);

        if (!provider) {
          toast.info('Please switch to Dogechain network within your wallet.');
          return;
        }

        if (account) {
          const balance = await provider?.getBalance(account);
          balance &&
            dispatch({
              type: StoreActionTypes.SET_BALANCE,
              payload: { balance: utils.formatEther(balance) },
            });
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
    [dispatch]
  );

  return (
    <div
      id="default-modal"
      className="y-full fixed top-0 left-0 z-50 flex h-modal w-full items-center justify-center"
    >
      <div className="relative h-full w-full max-w-md px-4 md:h-auto">
        <div className="relative rounded-lg bg-wallet shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b px-6 py-4 dark:border-gray-600">
            <h3 className="lg:text-xl font-comic font-semibold text-gray-900 dark:text-white">
              Connect wallet
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={hideModal}
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <span className="font-comic text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available wallet providers or create a new
              one.
            </span>
            <ul className="my-4 space-y-3">
              <li>
                <button
                  onClick={() => handleConnectWallet(WalletType.METAMASK)}
                  className="group flex w-full items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <img
                    className="h-[20px] w-[20px]"
                    src="/img/metamask.svg"
                    alt="metamask"
                  />
                  <span className="ml-6 flex-1 whitespace-nowrap text-left font-comic">
                    MetaMask
                  </span>
                  <span className="text-xs ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    Popular
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleConnectWallet(WalletType.WALLET_CONNECT)}
                  className="group flex w-full items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <img
                    className="h-[20px] w-[20px]"
                    src="/img/walletconnect.svg"
                    alt="wallet connect"
                  />
                  <span className="ml-6 flex-1 whitespace-nowrap text-left font-comic">
                    WalletConnect
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
