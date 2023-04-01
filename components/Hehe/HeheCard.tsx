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
  const colors = ['#3F3B6C', '#624F82', '#9F73AB', '#A3C7D6', '#E7153A'];
  const variants = {
    start: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
      backgroundColor: colors[colorIndex],
    },
    end: {
      scale: 1.2,
      transition: {
        duration: 0.2,
        yoyo: 5,
      },
      backgroundColor: colors[(colorIndex + 1) % colors.length],
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((colorIndex + 1) % colors.length);
    }, 500);
    return () => clearInterval(interval);
  }, [colorIndex, colors.length]);

  return (
    <div className="flex h-screen w-[80%] flex-col items-center justify-center md:w-full">
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
          className="md:h-35 md:w-35 h-16 w-16 rounded-md"
          src="/img/cursor2.gif"
          alt="no-image"
        />
      </motion.div>
      <div className="flex h-[80%] w-full flex-col items-center justify-center space-y-8 rounded-2xl border-[2px] border-black bg-[#8BBCCC] px-6 md:w-[50%] md:px-12">
        <motion.div
          className="text-bold mb-4 h-20 w-[80%] rounded-xl px-5 py-3 text-center font-doge text-[20px] text-white md:h-24 md:px-6 md:py-7 md:text-[26px]"
          animate="end"
          initial="start"
          variants={variants}
          onClick={() => {
            router.push('/auction');
          }}
          onAnimationComplete={() =>
            setColorIndex((colorIndex + 1) % colors.length)
          }
        >
          DOGE MAKE HEHE
        </motion.div>
        <div className="flex flex-col items-center space-y-4">
          <span className="font-comic text-[18px] md:text-[25px]">
            Welcome to the DogeHehe Auctions!
          </span>
          <span className="font-comic text-[14px] text-white md:text-[21px]">
            {`One unique NFT up for auction everyday, with artwork that's stored
          on-chain.`}
          </span>
          <span className="font-comic text-[14px] text-white md:text-[21px]">
            AI generated jokes, one-liners, and philosophy on each NFT - yours
            to own.
          </span>
          <span className="font-comic text-[18px] md:text-[25px]">
            Auction refreshes every 24 hours - bid away!
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeheCard;
