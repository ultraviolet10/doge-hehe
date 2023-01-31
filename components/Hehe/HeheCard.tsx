import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { useFollowPointer } from '@hooks/useFollowPointer';
import { motion } from 'framer-motion';


interface HeheCardProps {} // eslint-disable-line 

const HeheCard: React.FC<HeheCardProps> = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#3F3B6C', '#624F82', '#9F73AB', '#A3C7D6'];
  const variants = {
    start: {
      backgroundColor: colors[colorIndex],
    },
    end: {
      backgroundColor: colors[(colorIndex + 1) % colors.length],
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((colorIndex + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [colorIndex, colors.length]);

  const buttonVariants = {
    hover: {
      backgroundImage: 'linear-gradient(90deg, #ff0099 0%, #493240 100%)',
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-[80%] w-[50%] items-center justify-center place-self-center rounded-xl">
      <motion.div
        ref={ref}
        className="box"
        animate={{ x, y }}
        transition={{
          type: 'spring',
          bounce: 0.25,
          damping: 10,
          stiffness: 70,
          restDelta: 0.01,
        }}
      >
        <img
          className="h-[35px] w-[35px] rounded-md"
          src="/img/cursor2.gif"
          alt="no-image"
        />
      </motion.div>
      <div className="flex h-[75%] w-[85%] flex-col items-center justify-center space-y-8 rounded-2xl border-[2px] border-black bg-[#8BBCCC] px-12">
        <motion.div
          className="text-bold mb-4 h-20 rounded-xl p-5 font-doge text-[26px] text-white"
          animate="end"
          initial="start"
          variants={variants}
          onAnimationComplete={() =>
            setColorIndex((colorIndex + 1) % colors.length)
          }
        >
          DOGE MAKE HEHE
        </motion.div>
        <div className="flex flex-col space-y-4">
          <span className="font-comic text-[25px]">
            Welcome to the DogeHehe Auctions!
          </span>
          <span className="font-comic text-[21px] text-white">
            {`One unique NFT up for auction everyday, with artwork that's stored
              on-chain.`}
          </span>
          <span className="font-comic text-[21px] text-white">
            AI generated jokes on each NFT - yours to own.
          </span>
          <span className="font-comic text-[25px]">
            Auction refreshes every 24 hours - bid away!
          </span>
        </div>
        <motion.button
          className="rounded-xl border border-indigo-900 bg-transparent py-2 px-4 font-doge font-semibold text-white hover:border-transparent hover:bg-indigo-500 hover:text-white"
          variants={buttonVariants}
          whileHover="hover"
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
