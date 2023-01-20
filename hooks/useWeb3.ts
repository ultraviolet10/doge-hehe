import { useCallback, useMemo } from 'react';
import { ContractTransaction, ethers } from 'ethers';

import {
  AUCTION_CONTRACT_ADDRESS,
  HEHE_CONTRACT_ADDRESS,
  HEHE_TOKEN_CONTRACT_ADDRESS,
} from '@config/config';
import { useStore } from '@store/store';

import ABI from '../abi/abi.json';

export const useWeb3 = () => {
  const { store } = useStore();
  const { provider } = store;
  const signer = provider?.getSigner();
  const heheContract = useMemo(() => {
    return new ethers.Contract(HEHE_CONTRACT_ADDRESS, ABI.hehe, signer);
  }, [signer]);

  const heheTokenContract = useMemo(() => {
    return new ethers.Contract(
      HEHE_TOKEN_CONTRACT_ADDRESS,
      ABI.tokenMint,
      signer
    );
  }, [signer]);

  const auctionContract = useMemo(() => {
    return new ethers.Contract(
      AUCTION_CONTRACT_ADDRESS,
      ABI.auctionHouse,
      signer
    );
  }, [signer]);

  const getHahas = useCallback(async () => {
    const hahas = await heheContract.hahas(
      Math.abs(
        Math.floor(
          Math.random() * (Math.ceil(0) - Math.floor(4)) + Math.ceil(0)
        )
      )
    );
    if (hahas) {
      return hahas;
    } else {
      return '';
    }
  }, [heheContract]);

  const mintNft = useCallback(
    async (punchline: string, hook: string, address: string) => {
      const mint: ContractTransaction = await heheTokenContract.create(
        address,
        punchline,
        hook,
        Math.abs(
          Math.floor(
            Math.random() * (Math.ceil(1) - Math.floor(10)) + Math.ceil(1)
          )
        )
      );
      if (mint) {
        const mintTx = await mint.wait();
        if (mintTx.confirmations > 0) {
          return true;
        }
      }
      return false;
    },
    [heheTokenContract]
  );

  const getEventData = useCallback(async () => {
    const logData = await auctionContract._auctions(1);

    console.log(logData);

    return logData;
  }, [auctionContract]);

  const placeBid = useCallback(
    async (amount: string, tokenId?: number) => {
      const setBidTx: ContractTransaction = await auctionContract.bid(tokenId, {
        value: ethers.utils.parseEther(amount),
      });
      if (setBidTx) {
        const txConfirmation = await setBidTx.wait();
        if (txConfirmation) {
          return true;
        }
      }
      return false;
    },
    [auctionContract]
  );

  return {
    getHahas,
    mintNft,
    getEventData,
    placeBid,
  };
};
