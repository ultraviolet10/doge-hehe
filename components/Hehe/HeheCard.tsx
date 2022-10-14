import React, { useState } from "react";

import { useWeb3 } from "../../hooks/useWeb3";

interface HeheCardProps {}

interface Haha {
  question?: string;
  answer?: string;
}

const HeheCard: React.FC<HeheCardProps> = () => {
  const { getHahas } = useWeb3();
  const [qa, setQA] = useState<Haha>({
    question: undefined,
    answer: undefined,
  });

  const handleHeheCommand = async () => {
    const haha = await getHahas();
    if (haha) {
      console.log(haha);
      setQA({ question: haha[0], answer: haha[1] });
    }
  };
  return (
    <div className="flex w-full h-[800px] items-center justify-center place-self-center">
      <div className="flex flex-col w-[80%] h-[80%] bg-[#C24069] items-center justify-center space-y-4">
        <span className="text-[22px] font-poppins text-bold text-white">
          Doge make hehe
        </span>
        {qa.answer ? (
          <div className="flex flex-col space-y-4">
            <span className="text-[16px] font-poppins text-white">
              {qa.question}
            </span>
            <span className="text-[16px] font-poppins text-white">
              {qa.answer}
            </span>
          </div>
        ) : (
          <button
            className="p-2 text-white border border-white rounded-lg"
            onClick={() => {
              handleHeheCommand();
            }}
          >
            Bring it
          </button>
        )}
      </div>
    </div>
  );
};

export default HeheCard;
