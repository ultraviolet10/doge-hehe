import React from 'react';

interface ColoredHeaderProps {
  text: string;
}
const ColoredHeader: React.FC<ColoredHeaderProps> = ({ text }) => {
  const letters = text.split('');

  return (
    <span className="md:text-3xl font-doge text-lg">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="inline text-center"
          style={{ color: `hsl(${index * 10}, 70%, 50%)`, fontSize: '1.5rem' }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

export default ColoredHeader;
