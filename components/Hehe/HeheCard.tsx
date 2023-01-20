import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import { useStore } from '@store/store';
import { motion } from 'framer-motion';

import { useWeb3 } from '../../hooks/useWeb3';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
    <div className="flex h-[800px] w-full items-center justify-center place-self-center">
      <div className="flex h-[80%] w-[80%] flex-col items-center justify-center space-y-4 bg-[#C24069]">
        <div className="flex w-full flex-row justify-between">
          <img
            className="h-[80px] w-[100px] place-self-end rounded-lg opacity-30"
            src={'/img/heh2.jpeg'}
            alt="no_image"
          />
          <img
            className="h-[80px] w-[100px] place-self-end rounded-lg opacity-30"
            src={'/img/hehe1.webp'}
            alt="no_image"
          />
        </div>

        <span className="text-bold font-doge text-[22px] text-white">
          Doge make hehe
        </span>
        {qa.answer ? (
          <div className="flex flex-col space-y-4 py-4">
            <span className="font-doge text-[16px] text-white">
              {qa.question}
            </span>
            <span className="font-doge text-[16px] text-white">
              {qa.answer}
            </span>
            <div className="flex flex-row space-x-2">
              <button
                className="w-1/2 rounded-lg border border-white p-2 text-white"
                onClick={() => {
                  handleHeheCommand();
                }}
              >
                Go Again!
              </button>
              <button
                className="w-1/2 rounded-lg border border-white p-2 text-white"
                onClick={handleMintClick}
              >
                Mint as NFT
              </button>
            </div>
            {minted ? (
              <div className="flex flex-col">
                <span className="text-bold font-doge text-[16px] text-white">
                  {`Your token has been successfully minted!`}
                </span>
                <span className="text-bold font-doge text-[16px] text-white">
                  {`Find your Hehe in your wallet.`}
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            className="rounded-lg border border-white p-2 font-doge text-white"
            onClick={() => {
              handleHeheCommand();
            }}
          >
            Bring it
          </button>
        )}
        <motion.button
          className="rounded-lg border border-white p-2 font-doge text-white"
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
