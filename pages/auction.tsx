import React from 'react';
import type { NextPage } from 'next';

import { motion } from 'framer-motion';
import { useModal, ModalEnum } from '@contexts/modal';

const AuctionPage: NextPage = () => {
  const { setModal } = useModal();
  return (
    <div className="flex flex-col w-full h-screen bg-black">
      <div className="flex flex-col items-center justify-center p-3 space-y-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <span className="text-white text-[20px] font-doge">
            Auctions!!!!!
          </span>
        </motion.div>

        <div className="flex flex-row space-x-8 items-center">
          <img
            className="w-[300px] h-[300px] rounded-md"
            src="/img/doge-gradient.png"
          />
          <div className="flex flex-col space-y-6">
            <span className="text-[16px] text-white font-doge">
              Welcome to the DogeHehe Auctions!
            </span>
            <span className="text-[16px] text-white font-doge">
              One unique NFT up for auction everyday, with artwork that's stored
              on-chain.
            </span>
            <span className="text-[16px] text-white font-doge">
              AI generated jokes on each NFT - yours to own.
            </span>
            <span className="text-[16px] text-white font-doge">
              Auction refreshes every 24 hours - bid away!
            </span>
          </div>
        </div>
        <motion.div
          className="flex w-[200px] h-[75px] rounded-lg bg-[#719388] border-[1px] border-white items-center justify-center"
          whileHover={{
            position: 'relative',
            zIndex: 1,
            scale: 1.3,
            transition: { duration: 0.2 },
          }}
          onClick={() => {
            setModal(ModalEnum.AUCTION_MODAL);
          }}
        >
          <span className="text-white text-[16px] font-doge">Bid!!!</span>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionPage;
