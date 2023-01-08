import React, { useCallback, useState, useRef } from 'react';

import { Modal } from 'flowbite-react';
import { useModal, ModalEnum } from '@contexts/modal';

import { useClickAway } from 'react-use';

interface AuctionModalProps {}

const AuctionModal: React.FC<AuctionModalProps> = () => {
  const { modal, hideModal } = useModal();
  const ref = useRef(null);

  const [bidAmount, setBidAmount] = useState<string>('0.0');

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
        className="flex flex-col w-full h-full border border-white rounded-md shadow space-y-6 bg-gray-700 h-[600px] p-6 items-center justify-center"
      >
        <span className="text-white text-[16px] font-doge">Current Hehe</span>
        <div className="flex flex-row w-full p-6 space-x-20 items-start">
          <img
            className="w-[300px] h-[300px] rounded-md"
            src="/img/doge-gradient.png"
          />
          <div className="flex flex-col space-y-8 w-full">
            <div className="flex w-full">
              <span className="text-white text-[25px] font-doge">{`Hehe No. 1`}</span>
            </div>
            <div className="flex flex-row space-x-4 w-full justify-between">
              <div className="flex flex-col space-y-2">
                <span className="text-[#6c43dc] text-[16px] font-doge">
                  Current Bid
                </span>
                <span className="text-white text-[16px] font-doge">
                  10000 Ɖ
                </span>
              </div>

              <div className="w-[3px] bg-white bg-opacity-10"></div>

              <div className="flex flex-col space-y-2">
                <span className="text-[#6c43dc] text-[16px] font-doge">
                  Ends On
                </span>
                <span className="text-white text-[16px] font-doge">
                  12/3/2023
                </span>
              </div>
            </div>

            <div className="flex flex-row space-x-3">
              <input
                value={bidAmount}
                onChange={handleInput}
                className="flex items-center h-[44px] px-5 w-full text-base font-bold text-white rounded-lg placeholder:text-right bg-[#17181A] group hover:shadow dark:bg-gray-600  dark:text-white"
              />
              <button
                className="w-1/2 p-2 text-white border border-white rounded-lg text-doge"
                // onClick={handleMintClick}
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
