import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { ethers } from 'ethers';

import CurrentDoge from '@components/Hehe/CurrentDoge';
import DoneHehe from '@components/Hehe/DoneHehe';
import { useWeb3 } from '@hooks/useWeb3';
import { useStore } from '@store/store';
import { Auction } from '@type/common';
import {
  compareTimestamps,
  convertTimestampToHHMMSS,
  shortenAddress,
} from '@utils/tool';
import { motion } from 'framer-motion';

const AuctionPage: NextPage = () => {
  const { store } = useStore();
  const { account } = store;
  const [bidAmount, setBidAmount] = useState<string>('0.0');
  const [auction, setAuction] = useState<Auction | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>('');
  const [elapsed, setElapsed] = useState<boolean>(false);

  const { getEventData, placeHeheBid, settleAuction } = useWeb3();

  useEffect(() => {
    async function getRecentAuctionData() {
      const logs = await getEventData();

      if (logs) {
        setAuction(logs);
        setTime(convertTimestampToHHMMSS(logs?.endTime));
        compareTimestamps(logs?.endTime) < 0
          ? setElapsed(false)
          : setElapsed(true);
      }
    }

    const interval = setInterval(() => {
      getRecentAuctionData();
    }, 2000);

    return () => clearInterval(interval);
  }, [getEventData]);

  console.log(auction?.bidder.toLowerCase() == account?.toLowerCase());

  // eslint-disable-next-line
  const handleInput = (event: any) => {
    setBidAmount(event?.target.value);
  };

  const handleBid = useCallback(async () => {
    console.log(bidAmount);
    const placeBid = await placeHeheBid(bidAmount);
    if (placeBid) {
      getEventData();
      setBidAmount('');
    }
  }, [bidAmount, getEventData, placeHeheBid]);

  const handleSettle = useCallback(async () => {
    const settle = await settleAuction();
    if (settle) {
      setElapsed(false);
      getEventData();
    }
  }, [getEventData, settleAuction]);

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
          {/* {auction ? () : ()} */}
          <CurrentDoge />

          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              <span className="font-doge text-[25px] text-black">
                {`Hehe #`}
                {` `}
                {`${auction?.tokenId}`}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <span className="font-comic text-[18px] text-black">
                {`Current Bidder:`}
              </span>
              <a
                href={`https://goerli.etherscan.io/address/${auction?.bidder}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-comic text-[20px] font-bold text-black">
                  {`${
                    auction?.bidder ? shortenAddress(auction.bidder) : '---'
                  }`}
                </span>
              </a>
            </div>
            <div className="flex flex-row justify-between space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="font-comic text-[16px] text-[#6c43dc]">
                  Current Bid
                </span>
                <span className="font-comic text-[16px] text-black">
                  {auction
                    ? `${ethers.utils.formatEther(auction.bidAmount)} Ɖ`
                    : `---`}
                </span>
              </div>

              <div className="w-[3px] bg-black bg-opacity-20"></div>

              <div className="flex flex-col space-y-2">
                <span className="font-comic text-[16px] text-[#6c43dc]">
                  Ends At
                </span>
                <span className="font-comic text-[16px] text-black">
                  {time ? `${time}` : `---`}
                </span>
              </div>
            </div>
            
            {elapsed &&
            auction?.bidder.toLowerCase() === account?.toLowerCase() ? (
              <motion.div
                className="flex h-[40%] w-full flex-row items-center justify-center"
                onClick={handleSettle}
              >
                <span className="bg-purple-700 text-center font-doge text-[20px] text-white">
                  <DoneHehe index={0} content={`X`} />
                </span>
              </motion.div>
            ) : (
              <div className="flex w-full flex-row space-x-3">
                <input
                  value={bidAmount}
                  onChange={handleInput}
                  className="group flex h-[44px] w-[70%] items-center rounded-lg bg-[#FFE6A0] px-5 font-doge text-base font-bold text-black placeholder:text-right hover:shadow"
                />
                <button
                  className="w-[30%] rounded-lg border border-black p-2 font-doge"
                  onClick={handleBid}
                  disabled={elapsed}
                >
                  much bid
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
