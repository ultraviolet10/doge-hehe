import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { useFollowPointer } from '@hooks/useFollowPointer';
import { motion, useAnimation } from 'framer-motion';

import CurrentDoge from './CurrentDoge';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeheCardProps {}

// interface Haha {
//   question?: string;
//   answer?: string;
// }

const HeheCard: React.FC<HeheCardProps> = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  const controls = useAnimation();

  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['#ff0099', '#493240', '#63BE61', '#61AAF3'];
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
  }, []);

  const textVariants = {
    rotate: {
      color: ['#ff0099', '#493240', '#00ff00'],
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  const buttonVariants = {
    hover: {
      backgroundImage: 'linear-gradient(90deg, #ff0099 0%, #493240 100%)',
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center place-self-center rounded-xl">
      <div className="flex h-[80%] w-[80%] flex-col items-center justify-center space-y-20 rounded-2xl bg-[#7C426D] p-4">
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
        <motion.div
          className="text-bold h-20 font-doge text-[26px] text-white p-5 rounded-xl"
          animate="end"
          initial="start"
          variants={variants}
          onAnimationComplete={() =>
            setColorIndex((colorIndex + 1) % colors.length)
          }
        >
          DOGE MAKE HEHE
        </motion.div>
        <CurrentDoge />
        <div className="flex flex-col space-y-4">
          <motion.div
            animate={{ backgroundSize: '10000px' }}
            transition={{ duration: 3 }}
            className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-doge text-[16px]"
          >
            Welcome to the DogeHehe Auctions!
          </motion.div>
          <span className="font-doge text-[16px] text-white">
            {`One unique NFT up for auction everyday, with artwork that's stored
              on-chain.`}
          </span>
          <span className="font-doge text-[16px] text-white">
            AI generated jokes on each NFT - yours to own.
          </span>
          <motion.p
            className="text-xl font-doge"
            animate={controls}
            variants={textVariants}
          >
            Auction refreshes every 24 hours - bid away!
          </motion.p>
        </div>
        <motion.button
          className="rounded-xl border border-indigo-500 bg-transparent py-2 px-4 font-doge font-semibold text-white hover:border-transparent hover:bg-indigo-500 hover:text-white"
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
