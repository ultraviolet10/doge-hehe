import React from 'react';

import { motion } from 'framer-motion';

interface ZoomDogeProps {} // eslint-disable-line

const ZoomDoge: React.FC<ZoomDogeProps> = () => {
  return (
    <motion.img
      className="h-[100px] w-[300px] -rotate-[90deg]"
      src="/img/dogebread.png"
      alt="zoomies"
      animate={{
        y: [-100, 100, -50, 50, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      style={{ maxHeight: '60vh', transform: 'rotate(90deg)' }}
    />
  );
};

export default ZoomDoge;
