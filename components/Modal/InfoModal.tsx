import React from 'react';

import { useModal } from '@contexts/modal';

interface InfoModalProps {} // eslint-disable-line

const InfoModal: React.FC<InfoModalProps> = () => {
  const { hideModal } = useModal();
  return (
    <div
      id="default-modal"
      className="y-full fixed top-0 left-0 z-50 flex h-modal w-full items-center justify-center"
    >
      <div className="relative h-full w-full max-w-md px-4 md:h-auto">
        <div className="relative rounded-lg bg-wallet shadow dark:bg-gray-700">
          <div className="flex items-center justify-between rounded-t border-b px-6 py-4 dark:border-gray-600">
            <h3 className="lg:text-xl font-comic font-semibold text-gray-900 dark:text-white">
              settle current and start next auction
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={hideModal}
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <span className="font-comic text-[16px] font-normal text-gray-500 dark:text-gray-400">
              {`Wow, much auction. Anyone can settle auction. Very easy. When
              auction ends, need gas-only transaction to start next auction and
              mint current Hehe to winner's wallet. As gas price go up and down,
              cost of settlement also go up and down. So, be careful! Such
              fluctuation, much volatility.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
