import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { BigNumber, ethers } from 'ethers';

import ColoredHeader from '@components/Hehe/ColoredHeader';
import CurrentDoge from '@components/Hehe/CurrentDoge';
import { ModalEnum, useModal } from '@contexts/modal';
import { useWeb3 } from '@hooks/useWeb3';
import { useStore } from '@store/store';
import { Auction } from '@type/common';
import {
  compareTimestamps,
  convertTimestampToHHMMSS,
  percentIncrement,
  shortenAddress,
} from '@utils/tool';

const AuctionPage: NextPage = () => {
  const { store } = useStore();
  const { account } = store;
  const { setModal } = useModal();
  const [bidAmount, setBidAmount] = useState<string>('0.0');
  const [auction, setAuction] = useState<Auction | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>('');
  const [elapsed, setElapsed] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [validBid, setValidBid] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const { getEventData, placeHeheBid, settleAuction, getPaused } = useWeb3();

  useEffect(() => {
    async function getRecentAuctionData() {
      const pauseStatus = await getPaused();
      if (pauseStatus) {
        setPaused(pauseStatus);
      } else {
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
    }

    const interval = setInterval(() => {
      getRecentAuctionData();
    }, 2000);

    return () => clearInterval(interval);
  }, [getEventData, getPaused]);

  // eslint-disable-next-line
  const handleInput = (event: any) => {
    setBidAmount(event?.target.value);
  };

  const handleInfoRequest = useCallback(() => {
    setModal(ModalEnum.INFO_MODAL);
  }, [setModal]);

  const handleBid = useCallback(async () => {
    // if bid amount is lesser than 1000 doge, don't allow it
    if (Number(percentIncrement(auction?.bidAmount as BigNumber))) {
      const placeBid = await placeHeheBid(bidAmount);
      if (placeBid) {
        getEventData();
        setBidAmount('');
        setVisible(false);
        setValidBid(false);
        setBidAmount('0.0');
      } else {
        setValidBid(true);
      }
    } else {
      setValidBid(true);
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

          {paused || !auction ? (
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
            <CurrentDoge tokenId={auction?.tokenId} />
          </div>

          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              <span className="font-doge text-[25px] text-black">
                {`Hehe #`}
                {` `}
                {auction?.tokenId !== undefined ? `${auction?.tokenId}` : `---`}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <span className="font-comic text-lg text-black md:text-[25px]">
                {`Current Bidder:`}
              </span>
              <a
                href={`https://explorer.dogechain.dog/address/${auction?.bidder}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-comic text-[30px] font-bold text-black hover:text-[#e53db7] hover:underline hover:decoration-1">
                  {`${
                    auction?.bidder &&
                    auction?.bidder !== ethers.constants.AddressZero
                      ? shortenAddress(auction.bidder)
                      : '---'
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
                <div
                  className="flex h-[50px] w-full flex-row items-center justify-center rounded-2xl border-[5px] border-white bg-purple-700 p-10 md:h-[50px] md:w-[80%]"
                  onClick={handleSettle}
                >
                  <span className="text-center font-doge text-lg text-white md:text-[25px]">
                    CLAIM YOUR HEHE
                  </span>
                </div>
              )}

            {
              // cases for when the auction time has elapsed
              ((!!elapsed &&
                auction?.bidder.toLowerCase() !== account?.toLowerCase() &&
                auction?.bidder !== ethers.constants.AddressZero) ||
                (!!elapsed &&
                  auction?.bidder == ethers.constants.AddressZero)) && (
                <div className="flex flex-row items-center justify-center space-x-3">
                  <div
                    className="flex h-[50px] w-full flex-row items-center justify-center rounded-2xl border-[5px] border-white bg-purple-700 p-10 md:h-[50px] md:w-[80%]"
                    onClick={handleSettle}
                  >
                    <span className="text-center font-doge text-lg text-white md:text-[25px]">
                      LFG hehe
                    </span>
                  </div>
                  <img
                    src={'/img/info.svg'}
                    alt="info"
                    className="h-6 w-6"
                    onClick={handleInfoRequest}
                  />
                </div>
              )
            }

            {!elapsed && !visible ? (
              <div className="flex h-[20%] w-full flex-row space-x-3">
                <div className="flex flex-col items-center justify-center space-y-1">
                  {validBid && (
                    <span className="font-doge text-rose-500">
                      bid much low
                    </span>
                  )}

                  <input
                    onChange={handleInput}
                    disabled={elapsed || auction === undefined}
                    placeholder={percentIncrement(
                      auction?.bidAmount as BigNumber
                    )}
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
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 md:w-[60%]">
          <span className="break-normal text-center font-comic text-lg md:text-[25px]">
            {`Wow! Much welcome to HeheDoge, fren! Here, you can
            bid on cool NFT artwork with jokes on them. Much humor! Every 24
            hours, we unveil a new NFT for auction, and you can place bids to
            win it. The highest bidder wins, and you get to enjoy a unique joke
            on your new NFT. Much fun! Our on-chain platform ensures that
            everything is safe and transparent, so you can trust us with your
            bids. Come join us and let's have much fun together!`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
