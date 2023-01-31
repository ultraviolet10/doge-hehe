import React from 'react';

import { ModalEnum, useModal } from '@contexts/modal';
import { useWallet } from '@contexts/wallet';
import { useStore } from '@store/store';
import { shortenAddress } from '@utils/tool';

interface ConnectButtonProps {} // eslint-disable-line

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { connected, disconnect } = useWallet();
  const { setModal } = useModal();
  const { store } = useStore();
  const { account } = store;

  const handleConnect = () => {
    if (!connected) setModal(ModalEnum.WALLET_MODAL);
    if (connected) disconnect();
  };

  return (
    <button
      onClick={handleConnect}
      type="button"
      className="bg-primary mr-8 flex flex-row items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2 text-center font-doge text-base font-medium text-white shadow-sm"
    >
      {!connected ? 'connect' : shortenAddress(account)}
    </button>
  );
};

export default ConnectButton;
