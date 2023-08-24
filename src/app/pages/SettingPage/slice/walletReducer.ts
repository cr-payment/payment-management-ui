import { createSlice } from '@reduxjs/toolkit';
import { useInjectReducer } from 'redux-injectors';
export interface chainType {
  id: number;
  name: string;
  walletAddress: string;
  tokens: tokenType[];
}

export interface tokenType {
  name: string;
  on: boolean;
}
export interface ChainInfoState {
  chains: chainType[];
  atChain: number;
}
const initialState: ChainInfoState = {
  chains: [
    {
      id: 1,
      name: 'Ethereum',
      walletAddress: '0x1234567890',
      tokens: [
        { name: 'USDT', on: true },
        { name: 'ETH', on: true },
        { name: 'SHIB', on: true },
      ],
    },
    {
      id: 2,
      name: 'Solana',
      walletAddress: '',
      tokens: [{ name: 'SOL', on: true }],
    },
    {
      id: 3,
      name: 'BSC',
      walletAddress: '0x1234567895',
      tokens: [{ name: 'BNB', on: true }],
    },
    {
      id: 4,
      name: 'Polygon',
      walletAddress: '0x1234567896',
      tokens: [{ name: 'MATIC', on: true }],
    },
    {
      id: 5,
      name: 'Near',
      walletAddress: '0x1234567897',
      tokens: [{ name: 'NEAR', on: true }],
    },
    {
      id: 6,
      name: 'Polkadot',
      walletAddress: '0x1234567898',
      tokens: [{ name: 'DOT', on: true }],
    },
    {
      id: 7,
      name: 'Sui',
      walletAddress: '0x1234567898',
      tokens: [{ name: 'SUI', on: true }],
    },
  ],
  atChain: 1,
};
const walletSlice = createSlice({
  name: 'chainInfo',
  initialState,
  reducers: {
    switchChain(state, action) {
      const id = action.payload;
      state.atChain = id;
    },
    changeAddress(state, action) {
      const { chainId, newAddress } = action.payload;
      // console.log(action.payload);
      // console.log(`id: ${chainId}, address: ${newAddress}`);
      const chain = state.chains.find((chain) => chain.id === chainId);
      // console.log(chain);
      if (chain !== undefined) {
        chain.walletAddress = newAddress;
        console.log(newAddress);
      }
    },
    toggleToken(state, action) {
      const { chainId, tokenId } = action.payload;
      const chain = state.chains.find((chain) => chain.id === chainId);
      if (chain !== undefined) {
        const status = chain.tokens[tokenId].on;
        chain.tokens[tokenId].on = !status;
        console.log(chain.tokens[tokenId].on);
      }
    },
  },
});
export const useWalletSlice = () => {
  useInjectReducer({ key: walletSlice.name, reducer: walletSlice.reducer });
  return { actions: walletSlice.actions };
};

// TODO khai báo selector để dùng sẵn type của useAppSelector

export const { switchChain, changeAddress, toggleToken } = walletSlice.actions;
export default walletSlice.reducer;
