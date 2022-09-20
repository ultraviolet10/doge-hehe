import React from 'react';

import ConnectButton from '@components/Button/ConnectButton';

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-black ">
      <div className="md:container md:mx-auto">
        <div className="flex flex-row justify-between bg-black">
          <img
            className="w-[194px] h-[56px] md:w-[277px] md:h-[80px]"
            src="/img/logo.png"
            alt="logo"
          />
          <div className="flex items-center space-x-6">
            <p className="text-sm font-normal text-white font-poppins">
              Menu 1
            </p>
            <p className="text-sm font-normal text-white font-poppins">
              Menu 2
            </p>
            <p className="text-sm font-normal text-white font-poppins">
              Menu 3
            </p>
            <p className="text-sm font-normal text-white font-poppins">
              Menu 4
            </p>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
