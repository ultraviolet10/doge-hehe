import React from 'react';

import ConnectButton from '@components/Button/ConnectButton';
import ColoredHeader from '@components/Hehe/ColoredHeader';

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-body">
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="flex flex-row items-center justify-between">
          <ColoredHeader text="HeheDoge" />
          <div className="flex items-center space-x-3">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
