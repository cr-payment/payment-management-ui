import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {
  AddWalletRequest,
  AddWalletResponse,
  ChainData,
  ChainInfoState,
  CurrencyConfigResponse,
  chainType,
} from './types';
import { addWalletSaga, fetchChainsSaga } from './saga';
const initialChainInfoState: ChainData ={
  chains: [],
  atChain: 1
}

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
    fetchChainsRequest(state) {
      state.loading = true;
      state.error = false;
    },
    fetchChainsSuccess(state, action: PayloadAction<CurrencyConfigResponse>) {
      state.loading = false;
      state.error = false;
      // state.chainData = action.payload.data;
      // map data từ response về dạng ChainData
      console.log(action.payload.data)
      const mappedChains:chainType[] = action.payload.data.map((payloadData) => {
        return {
          id: payloadData.swapId,
          chainId: payloadData.chainId,
          name: payloadData.chainName,
          logo: payloadData.chainLogo,
          walletAddress: '',
          tokens: [],
        };
      });
      state.chainData.chains = mappedChains;
    },
    fetchChainsError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});
export const useWalletSlice = () => {
  useInjectReducer({ key: walletSlice.name, reducer: walletSlice.reducer });
  useInjectSaga({ key: walletSlice.name, saga: addWalletSaga });
  useInjectSaga({ key: 'key', saga: fetchChainsSaga });
  return { actions: walletSlice.actions };
};

export const { actions: walletActions } = walletSlice;

// TODO khai báo selector để dùng sẵn type của useAppSelector

export const { switchChain, changeAddress, toggleToken, addWalletRequest, fetchChainsRequest,fetchChainsSuccess,fetchChainsError } =
  walletSlice.actions;
export default walletSlice.reducer;
