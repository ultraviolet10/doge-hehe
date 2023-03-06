import React from 'react';

interface ColoredHeaderProps {
  text: string;
}
const ColoredHeader: React.FC<ColoredHeaderProps> = ({ text }) => {
  const letters = text.split('');

  return (
    <span className="font-doge text-[30px]">
      {letters.map((letter, index) => (
        <span key={index} style={{ color: `hsl(${index * 10}, 70%, 50%)` }}>
          {letter}
        </span>
      ))}
    </span>
  );
};

export default ColoredHeader;
