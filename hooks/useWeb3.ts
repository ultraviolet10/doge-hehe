import { useCallback, useMemo } from 'react';
import { BigNumber, ContractTransaction, ethers } from 'ethers';

import {
  AUCTION_CONTRACT_ADDRESS,
  HEHE_TOKEN_CONTRACT_ADDRESS,
} from '@config/config';
import { useStore } from '@store/store';

import ABI from '../abi/abi.json';

export const useWeb3 = () => {
  const { store } = useStore();
  const { provider } = store;
  const signer = provider?.getSigner();

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

  const getEventData = useCallback(async () => {
    try {
      const currentToken = await heheTokenContract.currentHeheId();
      const logData = await auctionContract._auctions(Number(currentToken) - 1);

      return logData;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }, [auctionContract, heheTokenContract]);

  const placeHeheBid = useCallback(
    async (amount: string) => {
      try {
        const currentToken = await heheTokenContract.currentHeheId();
        const setBidTx: ContractTransaction = await auctionContract.bid(
          BigNumber.from(Number(currentToken) - 1),
          {
            value: ethers.utils.parseEther(amount),
          }
        );
        if (setBidTx) {
          const txConfirmation = await setBidTx.wait(1);
          if (txConfirmation) {
            return true;
          }
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [auctionContract, heheTokenContract]
  );

  const settleAuction = useCallback(async () => {
    try {
      const settleTx: ContractTransaction =
        await auctionContract.settleCurrentAndCreateNewAuction();
      const confirmTx = await settleTx.wait(1);
      if (confirmTx) return true;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [auctionContract]);

  const getPaused = useCallback(async () => {
    try {
      const getPauseStatus = await auctionContract.paused();
      if (getPauseStatus) {
        return getPauseStatus;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [auctionContract]);

  return {
    getPaused,
    getEventData,
    placeHeheBid,
    settleAuction,
  };
};
