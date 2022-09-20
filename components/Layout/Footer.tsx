import React from 'react';

interface FooterProps {} // eslint-disable-line

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between bg-black h-[230px]">
          <div className="flex flex-row">
            <img src="/img/logo.png" alt="logo" />
            <div className="flex items-center space-x-6 ml-[50px]">
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
            </div>
          </div>
          <div className="flex flex-row justify-center space-x-4">
            <button>
              <img src="/img/discord_sm.png" alt="logo" />
            </button>
            <button>
              <img src="/img/twitter_sm.png" alt="logo" />
            </button>
            <button>
              <img src="/img/medium_sm.png" alt="logo" />
            </button>
            <button>
              <img src="/img/telegram_sm.png" alt="logo" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
