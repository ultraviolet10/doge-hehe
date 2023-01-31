import React from 'react';

import ConnectButton from '@components/Button/ConnectButton';

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-body">
      <div className="p-4 md:container md:mx-auto">
        <div className="flex flex-row justify-between">
          <span className="font-doge text-[30px] text-black">HeheDoge</span>
          <div className="flex items-center space-x-6">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
