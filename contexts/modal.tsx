import React, { createContext, useCallback, useContext, useState } from 'react';

import WalletModal from '@components/Modal/WalletModal';

export interface ModalContextProps {
  isConnectModalShown: boolean;
  showConnectModal: () => void;
  hideConnectModal: () => void;
}

const defaultContext: ModalContextProps = {
  isConnectModalShown: false,
  showConnectModal: () => null,
  hideConnectModal: () => null,
};

export const ModalContext = createContext<ModalContextProps>(defaultContext);

export const ModalProvider: React.FC = ({ children }) => {
  const [isConnectModalShown, setIsConnectModalShown] = useState(
    defaultContext.isConnectModalShown
  );

  const showConnectModal = useCallback(
    () => setIsConnectModalShown(true),
    [setIsConnectModalShown]
  );
  const hideConnectModal = useCallback(
    () => setIsConnectModalShown(false),
    [setIsConnectModalShown]
  );

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        isConnectModalShown,
        showConnectModal,
        hideConnectModal,
      }}
    >
      {children}
      {isConnectModalShown && <WalletModal />}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
