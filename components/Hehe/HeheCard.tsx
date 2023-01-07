import React, { useEffect, useState, useCallback } from 'react';

import { useWeb3 } from '../../hooks/useWeb3';
import { useStore } from '@store/store';
const { motion } = require('framer-motion');
import { useRouter } from 'next/router';

interface HeheCardProps {}

interface Haha {
  question?: string;
  answer?: string;
}

const HeheCard: React.FC<HeheCardProps> = () => {
  const { store } = useStore();
  const { account } = store;
  const { getHahas, mintNft } = useWeb3();
  const router = useRouter();

  const [qa, setQa] = useState<Haha>({
    question: undefined,
    answer: undefined,
  });

  const [minted, setMinted] = useState<boolean>(false);

  const handleHeheCommand = async () => {
    setMinted(false);
    const haha = await getHahas();
    if (haha) {
      setQa({ question: haha[0], answer: haha[1] });
    }
  };

  const handleMintClick = useCallback(async () => {
    if (!qa.answer || !qa.question || !account) return;
    const mintNew = await mintNft(qa.question, qa.answer, account);
    if (mintNew) {
      setMinted(true);
      console.log('done');
    }
  }, [account, mintNft]);

  return (
    <div className="flex w-full h-[800px] items-center justify-center place-self-center">
      <div className="flex flex-col w-[80%] h-[80%] bg-[#C24069] items-center justify-center space-y-4">
        <div className="flex flex-row w-full justify-between">
          <img
            className="opacity-30 w-[100px] h-[80px] place-self-end rounded-lg"
            src={'/img/heh2.jpeg'}
          />
          <img
            className="opacity-30 w-[100px] h-[80px] place-self-end rounded-lg"
            src={'/img/hehe1.webp'}
          />
        </div>

        <span className="text-[22px] font-doge text-bold text-white">
          Doge make hehe
        </span>
        {qa.answer ? (
          <div className="flex flex-col space-y-4 py-4">
            <span className="text-[16px] font-doge text-white">
              {qa.question}
            </span>
            <span className="text-[16px] font-doge text-white">
              {qa.answer}
            </span>
            <div className="flex flex-row space-x-2">
              <button
                className="w-1/2 p-2 text-white border border-white rounded-lg"
                onClick={() => {
                  handleHeheCommand();
                }}
              >
                Go Again!
              </button>
              <button
                className="w-1/2 p-2 text-white border border-white rounded-lg"
                onClick={handleMintClick}
              >
                Mint as NFT
              </button>
            </div>
            {minted ? (
              <div className="flex flex-col">
                <span className="text-[16px] font-doge text-bold text-white">
                  {`Your token has been successfully minted!`}
                </span>
                <span className="text-[16px] font-doge text-bold text-white">
                  {`Find your Hehe in your wallet.`}
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            className="p-2 text-white font-doge border border-white rounded-lg"
            onClick={() => {
              handleHeheCommand();
            }}
          >
            Bring it
          </button>
        )}
        <motion.button
          className="p-2 text-white font-doge border border-white rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            router.push('/auction');
          }}
        >
          Auctions!!!
        </motion.button>
      </div>
    </div>
  );
};

export default HeheCard;
