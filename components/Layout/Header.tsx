import React from 'react';

import ConnectButton from '@components/Button/ConnectButton';

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-black ">
      <div className="p-4 md:container md:mx-auto">
        <div className="flex flex-row justify-between bg-black">
          <span className="font-doge text-[30px] text-white">HeheDoge</span>
          <div className="flex items-center space-x-6">
            <span className="font-doge text-[16px] font-normal text-white">
              Make Me Laugh
            </span>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
