export interface AddWalletRequest {
  networkId: number;
  walletAddress: string;
}
export interface AddWalletResponse {
  userId: number;
  networkId: number;
  walletAddress: string;
  createdAt: number;
  updatedAt: number;
  chainName?: string;
  chainId?: number;
  id: number;
}
export interface chainType {
  id: number;
  chainId: string;
  name: string;
  walletAddress: string;
  logo: string;
  tokens: tokenType[];
  // config: CurrencyConfigResponseItem;
}

export interface tokenType {
  name: string;
  on: boolean;
}
// export interface ChainData {
//   chains: CurrencyConfigResponseItem[];
//   atChain: number;
// }
export interface ChainData {
  chains: chainType[];
  atChain: number;
}

export interface ChainInfoState {
  loading: boolean;
  chainData: ChainData;
  error: boolean;
}
// export interface CurrencyConfigRequest {
//   networkId: number;
//   walletAddress: string;
// }
export interface CurrencyConfigResponseItem {
  swapId: number,
  network: string,
  chainName: string,
  chainId: string,
  tokenAddresses: string,
  averageBlockTime: number,
  requiredConfirmations: number,
  tempRequiredConfirmations: number,
  scanApi: string,
  rpcEndpoint: string,
  explorerEndpoint: string,
  chainLogo: string,
  createdAt: number,
  updatedAt: number
}
export interface CurrencyConfigResponse{
  meta: {
    code: number,
    message: string
  },
  data: CurrencyConfigResponseItem[]
}