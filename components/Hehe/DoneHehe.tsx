import React, { useEffect, useState } from 'react';

interface DoneHeheProps {
  index: number;
  content: string;
}

const DoneHehe: React.FC<DoneHeheProps> = ({ index, content }) => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const animation = setInterval(() => {
      setY((y) => (y === 0 ? 100 : 0));
    }, 600 * (index + 1));

    return () => clearInterval(animation);
  }, [index]);

  return <span style={{ transform: `translateY(${y}%)` }}>{content}</span>;
};

export default DoneHehe;
