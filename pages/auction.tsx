import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { ethers } from 'ethers';

import ColoredHeader from '@components/Hehe/ColoredHeader';
import CurrentDoge from '@components/Hehe/CurrentDoge';
import { useWeb3 } from '@hooks/useWeb3';
import { useStore } from '@store/store';
import { Auction } from '@type/common';
import {
  compareTimestamps,
  convertTimestampToHHMMSS,
  isWithin5Percent,
  percentIncrement,
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
  const [visible, setVisible] = useState<boolean>(false);
  const [validBid, setValidBid] = useState<boolean>(false);

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
      } else {
        // no auction active
        setAuction(undefined);
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
    setVisible(true);
    if (isWithin5Percent(bidAmount, auction?.bidAmount as number)) {
      const placeBid = await placeHeheBid(bidAmount);
      if (placeBid) {
        getEventData();
        setBidAmount('');
        setVisible(false);
      }
    } else {
      setValidBid(false);
    }
  }, [auction?.bidAmount, bidAmount, getEventData, placeHeheBid]);

  const handleSettle = useCallback(async () => {
    const settle = await settleAuction();
    if (settle) {
      setElapsed(false);
      getEventData();
    }
  }, [getEventData, settleAuction]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-body">
      <div className="flex w-full flex-col items-center justify-center p-3">
        <div className="flex w-full flex-row items-center justify-between">
          <img
            className="h-[40px] w-[40px] rounded-md"
            src="/img/cursor2.gif"
            alt="no-image"
          />

          {!auction ? (
            <ColoredHeader
              text={`Oops! Looks like there isn't an ongoing auction.`}
            />
          ) : null}

          <img
            className="h-[40px] w-[40px] rounded-md"
            src="/img/cursor2.gif"
            alt="no-image"
          />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center space-x-4 md:flex-row md:space-x-8 md:py-20 md:px-10">
          <div className="flex w-[45%]">
            <CurrentDoge />
          </div>

          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              <span className="font-doge text-[25px] text-black">
                {`Hehe #`}
                {` `}
                {auction?.tokenId ? `${auction?.tokenId}` : `---`}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <span className="font-comic text-lg text-black md:text-[25px]">
                {`Current Bidder:`}
              </span>
              <a
                href={`https://goerli.etherscan.io/address/${auction?.bidder}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-comic text-[30px] font-bold text-black">
                  {`${
                    auction?.bidder ? shortenAddress(auction.bidder) : '---'
                  }`}
                </span>
              </a>
            </div>
            <div className="flex w-full flex-col justify-between md:w-[85%] md:flex-row">
              <div className="flex flex-col space-y-2">
                <span className="font-comic text-lg text-[#6c43dc] md:text-[25px]">
                  Current Bid
                </span>
                <span className="font-comic text-[30px] text-black">
                  {auction
                    ? `${ethers.utils.formatEther(auction.bidAmount)} Ɖ`
                    : `---`}
                </span>
              </div>

              <div className="md:w-[2px] md:bg-black md:bg-opacity-20"></div>

              <div className="flex flex-col space-y-2">
                <span className="font-comic text-lg text-[#6c43dc] md:text-[25px]">
                  Ends At
                </span>
                <span className="font-comic text-[30px] text-black">
                  {time ? `${time}` : `---`}
                </span>
              </div>
            </div>

            {elapsed &&
              auction?.bidder.toLowerCase() === account?.toLowerCase() && (
                <motion.div
                  className="flex h-1/2 w-full flex-row items-center justify-center rounded-2xl border-[5px] border-white bg-purple-700 p-10 md:h-[40%]"
                  onClick={handleSettle}
                >
                  <span className="text-center font-doge text-lg text-white md:text-[25px]">
                    CLAIM YOUR HEHE
                  </span>
                </motion.div>
              )}

            {!!elapsed &&
              auction?.bidder.toLowerCase() !== account?.toLowerCase() &&
              auction?.bidder !== ethers.constants.AddressZero && (
                <div className="flex h-[40%] w-full flex-row items-center justify-center space-x-4 rounded-2xl bg-purple-700 p-10">
                  <span className="text-center font-doge text-lg text-white md:text-[25px]">{`${shortenAddress(
                    auction?.bidder
                  )} is now a Hehe!`}</span>
                  <img
                    className="h-[40px] w-[40px] -rotate-[10deg]"
                    src={'/img/icon_var_4.svg'}
                    alt="doge"
                  />
                </div>
              )}

            {!elapsed && !visible ? (
              <div className="flex h-[20%] w-full flex-row space-x-3">
                <div className="flex flex-col items-center justify-center space-y-1">
                  {validBid && (
                    <span className="font-doge text-rose-500">
                      bid much low
                    </span>
                  )}

                  <input
                    value={bidAmount}
                    onChange={handleInput}
                    disabled={auction === undefined}
                    placeholder={percentIncrement(auction?.bidAmount as number)}
                    className="placeholder:right group flex h-[44px] w-[70%] items-center rounded-lg bg-[#FFE6A0] px-5 font-doge text-base font-bold text-black placeholder:text-right hover:shadow md:w-full"
                  />
                </div>

                <button
                  className="w-[30%] rounded-lg border border-black p-2 font-doge text-[10px]"
                  onClick={handleBid}
                  disabled={elapsed}
                >
                  much bid
                </button>
              </div>
            ) : (
              <div className="flex h-[20%] w-full flex-row space-x-3">
                <img
                  className="h-[60px] w-[60px] rounded-md"
                  src="/img/bang.gif"
                  alt="no-image"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 md:w-[60%]">
          <span className="break-normal font-comic text-lg md:text-[25px]">
            {`Wow! Much welcome to HeheDoge! Here, you can
            bid on cool NFT artwork with jokes on them. Much humor! Every 24
            hours, we unveil a new NFT for auction, and you can place bids to
            win it. The highest bidder wins, and you get to enjoy a unique joke
            on your new NFT. Much fun! Our on-chain platform ensures that
            everything is safe and transparent, so you can trust us with your
            bids. But you gotta hurry! This 30-day experiment is a limited-time
            offer, so don't miss your chance to be a part of the HeheDoge
            community. Come join us and let's have much fun together!`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
