import { BigNumber } from 'ethers';

export enum WalletType {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'wallet-connect',
}

export interface Auction {
  tokenId: number;
  startTime: BigNumber;
  endTime: BigNumber;
  bidAmount: BigNumber;
  bidder: string;
  settled: boolean;
}
