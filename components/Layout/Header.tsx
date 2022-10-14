import React from "react";

import ConnectButton from "@components/Button/ConnectButton";

interface HeaderProps {} // eslint-disable-line

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="bg-black ">
      <div className="md:container md:mx-auto p-4">
        <div className="flex flex-row justify-between bg-black">
          <span className="text-white text-[30px] font-poppins">HeheDoge</span>
          <div className="flex items-center space-x-6">
            <span className="text-[16px] font-normal text-white font-poppins">
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
