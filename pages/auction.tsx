import React from 'react';
import type { NextPage } from 'next';

import { motion } from 'framer-motion';

const AuctionPage: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-black">
      <div className="flex flex-col items-center justify-center p-3 space-y-12">
        <span className="text-white text-[20px] font-comic">Auctions!!!!!</span>
        <div className="flex flex-row space-x-8 items-center">
          <img
            className="w-[300px] h-[300px] rounded-md"
            src="/img/doge-gradient.png"
          ></img>
          <div className="flex flex-col space-y-6">
            <span className="text-[16px] text-white font-comic">
              Welcome to the DogeHehe Auctions!
            </span>
            <span className="text-[16px] text-white font-comic">
              One unique NFT up for auction everyday, with artwork that's stored
              on-chain.
            </span>
            <span className="text-[16px] text-white font-comic">
              AI generated jokes on each NFT - yours to own.
            </span>
            <span className="text-[16px] text-white font-comic">
              Auction refreshes every 24 hours - bid away!
            </span>
          </div>
        </div>
        <motion.div
          className="flex w-[200px] h-[75px] rounded-lg bg-[#719388] border-[1px] border-white items-center justify-center"
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
          // onClick={() => {}}
        >
          <span className="text-white text-[16px] font-comic">Bid!!!</span>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionPage;
