import React from 'react';
import type { NextPage } from 'next';

import { ModalEnum, useModal } from '@contexts/modal';
import { motion } from 'framer-motion';

const AuctionPage: NextPage = () => {
  const { setModal } = useModal();
  return (
    <div className="flex h-screen w-full flex-col bg-black">
      <div className="flex flex-col items-center justify-center space-y-12 p-3">
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
          <span className="font-doge text-[20px] text-white">
            Auctions!!!!!
          </span>
        </motion.div>

        <div className="flex flex-row items-center space-x-8">
          <img
            className="h-[300px] w-[300px] rounded-md"
            src="/img/doge-gradient.png"
            alt="no-image"
          />
          <div className="flex flex-col space-y-6">
            <span className="font-doge text-[16px] text-white">
              Welcome to the DogeHehe Auctions!
            </span>
            <span className="font-doge text-[16px] text-white">
              {`One unique NFT up for auction everyday, with artwork that's stored
              on-chain.`}
            </span>
            <span className="font-doge text-[16px] text-white">
              AI generated jokes on each NFT - yours to own.
            </span>
            <span className="font-doge text-[16px] text-white">
              Auction refreshes every 24 hours - bid away!
            </span>
          </div>
        </div>
        <motion.div
          className="flex h-[75px] w-[200px] items-center justify-center rounded-lg border-[1px] border-white bg-[#719388]"
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
          <span className="font-doge text-[16px] text-white">Bid!!!</span>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionPage;
