import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { AddWalletRequest, AddWalletResponse } from './types';
import { addWalletSaga } from './saga';
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
export interface ChainData {
  chains: chainType[];
  atChain: number;
}

export interface ChainInfoState {
  loading: boolean;
  chainData: ChainData;
  error: boolean;
}

// export interface ChainInfoState {
//   chains: chainType[];
//   atChain: number;
// }
const initialChainInfoState: ChainData = {
  chains: [
    {
      id: 1,
      name: 'Ethereum',
      walletAddress: '',
      tokens: [
        {
          name: 'USDT',
          on: true,
        },
        {
          name: 'ETH',
          on: true,
        },
        {
          name: 'SHIB',
          on: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Solana',
      walletAddress: '',
      tokens: [
        {
          name: 'SOL',
          on: true,
        },
      ],
    },
    {
      id: 3,
      name: 'BSC',
      walletAddress: '',
      tokens: [
        {
          name: 'BNB',
          on: true,
        },
      ],
    },
  ],
  atChain: 1,
};
const initialState: ChainInfoState = {
  loading: false,
  chainData: initialChainInfoState,
  error: false,
};

const walletSlice = createSlice({
  name: 'chainInfo',
  initialState,
  reducers: {
    switchChain(state, action) {
      const id = action.payload;
      state.chainData.atChain = id;
    },
    changeAddress(state, action) {
      const { chainId, newAddress } = action.payload;
      const chain = state.chainData.chains.find(
        (chain) => chain.id === chainId
      );
      if (chain !== undefined) {
        chain.walletAddress = newAddress;
        console.log(newAddress);
      }
    },
    toggleToken(state, action) {
      const { chainId, tokenId } = action.payload;
      const chain = state.chainData.chains.find(
        (chain) => chain.id === chainId
      );
      if (chain !== undefined) {
        const status = chain.tokens[tokenId].on;
        chain.tokens[tokenId].on = !status;
        console.log(chain.tokens[tokenId].on);
      }
    },
    addWalletRequest(state, action: PayloadAction<AddWalletRequest>) {
      // const { networkId, walletAddress } = action.payload;
      // // network có trong bảng nào
      // const chain = state.chainData.chains.find((chain) => chain.id === networkId);
      // if (chain !== undefined) {
      //   chain.walletAddress = walletAddress;
      //   console.log(walletAddress);
      // }
      // gửi request, cập nhật state local
      // đợi response từ server
      state.loading = true;
      state.error = false;
    },
    addWalletSuccess(state, action: PayloadAction<AddWalletResponse>) {
      state.loading = false;
      state.error = false;
      // nhận response từ server
      const { networkId, walletAddress } = action.payload;
      console.log(action.payload);
      console.log(networkId, ' ', walletAddress);
      const chain = state.chainData.chains.find(
        (chain) => chain.id === networkId
      );
      if (chain !== undefined) {
        chain.walletAddress = walletAddress;
        console.log(walletAddress);
      }
    },
    addWalletError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});
export const useWalletSlice = () => {
  useInjectReducer({ key: walletSlice.name, reducer: walletSlice.reducer });
  useInjectSaga({ key: walletSlice.name, saga: addWalletSaga });
  return { actions: walletSlice.actions };
};

export const { actions: addWalletActions } = walletSlice;

// TODO khai báo selector để dùng sẵn type của useAppSelector

export const { switchChain, changeAddress, toggleToken, addWalletRequest } =
  walletSlice.actions;
export default walletSlice.reducer;
