import { useCallback, useMemo } from "react";
import ABI from "../abi/abi.json";
import { useStore } from "@store/store";

import { HEHE_CONTRACT_ADDRESS } from "@config/config";

import { ethers } from "ethers";

export const useWeb3 = () => {
  const { store } = useStore();
  const { provider } = store;
  const signer = provider?.getSigner();
  const heheContract = useMemo(() => {
    return new ethers.Contract(HEHE_CONTRACT_ADDRESS, ABI.hehe, signer);
  }, [signer]);

  const getHahas = useCallback(async () => {
    const hahas = await heheContract.hahas(1);
    if (hahas) {
      return hahas;
    } else {
      return "";
    }
  }, [heheContract]);

  return {
    getHahas,
  };
};
