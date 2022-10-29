import { useCallback, useMemo } from "react";
import ABI from "../abi/abi.json";
import { useStore } from "@store/store";

import {
  HEHE_CONTRACT_ADDRESS,
  HEHE_TOKEN_CONTRACT_ADDRESS,
} from "@config/config";

import { ethers, ContractTransaction } from "ethers";

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
      return "";
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

  return {
    getHahas,
    mintNft,
  };
};
