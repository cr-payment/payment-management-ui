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
