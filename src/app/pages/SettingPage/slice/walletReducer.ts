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
      name: 'Sui',
      walletAddress:
        '0x12345678980xb5a4b7ed9c2a51a9baacf7dd53a8835be0694633a75da3f6ae3b5cdebafe052d',
      tokens: [
        { name: 'SUI', on: true },
        {
          name: 'USDT',
          on: false,
        },
        {
          name: 'USDC',
          on: false,
        },
        {
          name: 'DAI',
          on: false,
        },
      ],
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
