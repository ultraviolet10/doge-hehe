import { BigNumber } from 'ethers';

export enum WalletType {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'wallet-connect',
}

export interface Auction {
  tokenId: number;
  startTime: number;
  endTime: BigNumber;
  bidAmount: number;
  bidder: string;
  settled: boolean;
}
