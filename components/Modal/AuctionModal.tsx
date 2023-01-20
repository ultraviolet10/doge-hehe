import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Modal } from 'flowbite-react';
import { ethers } from 'ethers';

import { ModalEnum, useModal } from '@contexts/modal';
import { useWeb3 } from '@hooks/useWeb3';
import { Auction } from '@type/common';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AuctionModalProps {}

const AuctionModal: React.FC<AuctionModalProps> = () => {
  const { modal, hideModal } = useModal();
  const ref = useRef(null);

  const { getEventData, placeBid } = useWeb3();

  const [bidAmount, setBidAmount] = useState<string>('0.0');
  const [auction, setAuction] = useState<Auction | undefined>(undefined);
  const [ugh, setUgh] = useState<number>(1);

  useEffect(() => {
    async function getRecentAuctionData() {
      const logs = await getEventData();
      console.log(new Date((logs?.endTime).toNumber()));
      if (logs) setAuction(logs);
    }

    getRecentAuctionData();
  }, [ugh]);

  const handleClick = useCallback(async () => {
    const bidPlaced = await placeBid(bidAmount, auction?.tokenId);
    if (bidPlaced) {
      setUgh(ugh + 1);
    } else {
      console.log('nice2');
    }
  }, [auction?.tokenId, bidAmount, placeBid, ugh]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInput = (event: any) => {
    setBidAmount(event?.target.value);
  };

  useClickAway(ref, () => {
    hideModal();
  });

  return (
    <Modal
      show={modal === ModalEnum.AUCTION_MODAL}
      onClose={hideModal}
      size="4xl"
      style={{ background: 'rgba(15, 18, 25, 0.9)' }}
    >
      <div
        ref={ref}
        className="flex h-[600px] w-full flex-col items-center justify-center space-y-6 rounded-md border border-white bg-gray-700 p-6 shadow"
      >
        <span className="font-doge text-[16px] text-white">Current Hehe</span>
        <div className="flex w-full flex-row items-start space-x-20 p-6">
          <img
            className="h-[300px] w-[300px] rounded-md"
            src="/img/doge-gradient.png"
            alt="no_image"
          />
          <div className="flex w-full flex-col space-y-8">
            <div className="flex w-full">
              <span className="font-doge text-[25px] text-white">
                {`Hehe No.`}
                {` `}
                {`${auction?.tokenId}`}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <span className="font-doge text-[18px] text-white">
                {`Current Bidder:`}
              </span>
              <span className="font-doge text-[8px] text-white">
                {`${auction?.bidder}`}
              </span>
            </div>
            <div className="flex w-full flex-row justify-between space-x-4">
              <div className="flex flex-col space-y-2">
                <span className="font-doge text-[16px] text-[#6c43dc]">
                  Current Bid
                </span>
                <span className="font-doge text-[16px] text-white">
                  {auction
                    ? `${ethers.utils.formatEther(auction.bidAmount)} Ɖ`
                    : `---`}
                </span>
              </div>

              <div className="w-[3px] bg-white bg-opacity-10"></div>

              <div className="flex flex-col space-y-2">
                <span className="font-doge text-[16px] text-[#6c43dc]">
                  Ends On
                </span>
                <span className="font-doge text-[16px] text-white">
                  {auction
                    ? `${new Date((auction?.endTime).toNumber()).toUTCString()}`
                    : `---`}
                </span>
              </div>
            </div>

            <div className="flex flex-row space-x-3">
              <input
                value={bidAmount}
                onChange={handleInput}
                className="group flex h-[44px] w-full items-center rounded-lg bg-[#17181A] px-5 text-base font-bold text-white placeholder:text-right hover:shadow dark:bg-gray-600  dark:text-white"
              />
              <button
                className="text-doge w-1/2 rounded-lg border border-white p-2 text-white"
                onClick={handleClick}
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuctionModal;
