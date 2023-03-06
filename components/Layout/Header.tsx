import React from 'react';

import ConnectButton from '@components/Button/ConnectButton';
import ColoredHeader from '@components/Hehe/ColoredHeader';

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-body">
      <div className="p-4 md:container md:mx-auto">
        <div className="flex flex-row justify-between">
          <ColoredHeader text="HeheDoge" />
          <div className="flex items-center space-x-6">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
