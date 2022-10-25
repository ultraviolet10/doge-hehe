import React from "react";

import { useModal } from "@contexts/modal";
import { useWallet } from "@contexts/wallet";
import { useStore } from "@store/store";
import { shortenAddress } from "@utils/tool";

interface ConnectButtonProps {} // eslint-disable-line

const ConnectButton: React.FC<ConnectButtonProps> = () => {
  const { connected, disconnect } = useWallet();
  const { showConnectModal } = useModal();
  const { store } = useStore();
  const { account } = store;

  const handleConnect = () => {
    if (!connected) showConnectModal();
    if (connected) disconnect();
  };

  return (
    <button
      onClick={handleConnect}
      type="button"
      className="flex flex-row items-center font-comic bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 justify-center px-6 py-2 mr-8 text-base font-medium text-center text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-green-800"
    >
      {!connected ? "Connect Wallet" : shortenAddress(account)}
    </button>
  );
};

export default ConnectButton;
