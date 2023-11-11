import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { billSaga } from './saga';
import { BillData, BillState } from './types';

// state này cho các trạng thái loading, error, success
// BillData mới chứa dữ liệu
export const initialState: BillState = {
  loading: false,
  billData: {
    name: 'Lalala',
    email: 'frankie.jaydon@gmail.com',
    number: '0987654321',
    cart: [
      {
        name: 'chong chong tre',
        price: 123,
        quantity: 2,
        description: 'this is a description',
      },
      {
        name: 'den pin thu nho',
        price: 456,
        quantity: 1,
        description: 'this is a description',
      },
    ],

    shipping: 11,
    total: 0,
    paidIn: 0,
    token: 'USDT',
    transactionHash: '0x1900100ce',
  },
  error: false,
};

const slice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    billRequest(state, action: PayloadAction<any>) {
      state.loading = true;
    },
    billRequestSuccess(state, action: PayloadAction<BillData>) {
      state.loading = false;
      state.billData = action.payload;
    },
    billRequestError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: billActions } = slice;

export const useBillSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: billSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useBillSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
