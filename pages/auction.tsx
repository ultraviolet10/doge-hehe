import React, { useState } from 'react';
import type { NextPage } from 'next';

// import { ethers } from 'ethers';
import CurrentDoge from '@components/Hehe/CurrentDoge';
// import { useWeb3 } from '@hooks/useWeb3';
// import { Auction } from '@type/common';

// import { motion } from 'framer-motion';

const AuctionPage: NextPage = () => {
  const [bidAmount, setBidAmount] = useState<string>('0.0');
  // const [auction, setAuction] = useState<Auction | undefined>(undefined);

  // const { getEventData } = useWeb3();

  // useEffect(() => {
  //   async function getRecentAuctionData() {
  //     const logs = await getEventData();
  //     console.log(new Date((logs?.endTime).toNumber()));
  //     if (logs) setAuction(logs);
  //   }

  //   getRecentAuctionData();
  // }, [getEventData]);

  // eslint-disable-next-line
  const handleInput = (event: any) => {
    setBidAmount(event?.target.value);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-body">
      <div className="flex w-full flex-col items-center justify-center p-3">
        <div className="flex w-full flex-row justify-between">
          <img
            className="h-[40px] w-[40px] rounded-md"
            src="/img/cursor2.gif"
            alt="no-image"
          />

          <img
            className="h-[40px] w-[40px] rounded-md"
            src="/img/cursor2.gif"
            alt="no-image"
          />
        </div>

        <div className="flex h-full w-[60%] flex-row items-center justify-center space-x-20 py-20 px-10">
          <CurrentDoge />

          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              <span className="font-doge text-[25px] text-black">
                {`Hehe #`}
                {` `}
                {/* {`${auction?.tokenId}`} */}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <span className="font-comic text-[18px] text-black">
                {`Current Bidder:`}
              </span>
              <span className="font-comic text-[8px] text-black">
                {/* {`${auction?.bidder}`} */}
              </span>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="font-comic text-[16px] text-[#6c43dc]">
                  Current Bid
                </span>
                <span className="font-comic text-[16px] text-black">
                  {'---'}
                  {/* {auction
                    ? `${ethers.utils.formatEther(auction.bidAmount)} Ɖ`
                    : `---`} */}
                </span>
              </div>

              <div className="w-[3px] bg-black bg-opacity-20"></div>

              <div className="flex flex-col space-y-2">
                <span className="font-comic text-[16px] text-[#6c43dc]">
                  Ends On
                </span>
                <span className="font-comic text-[16px] text-black">
                  {'---'}
                  {/* {auction
                    ? `${new Date((auction?.endTime).toNumber()).toUTCString()}`
                    : `---`} */}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-row space-x-3">
              <input
                value={bidAmount}
                onChange={handleInput}
                className="group flex h-[44px] w-[70%] items-center rounded-lg bg-[#FFE6A0] px-5 font-doge text-base font-bold text-black placeholder:text-right hover:shadow"
              />
              <button
                className="w-[30%] rounded-lg border border-black p-2 text-doge"
                // onClick={handleClick}
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
