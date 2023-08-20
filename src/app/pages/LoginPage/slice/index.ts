import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authSaga } from './saga';
import { AuthRequest, AuthState, DataAuth } from './types';

export const initialState: AuthState = {
  loading: false,
  dataAuth: undefined,
  error: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<AuthRequest>) {
      state.loading = true;
      state.error = false;
    },
    loginSuccess(state, action: PayloadAction<DataAuth>) {
      state.loading = false;
      state.dataAuth = action.payload;
      localStorage.setItem('cr-payment_user', JSON.stringify(action.payload));
    },
    loginError(state) {
      state.loading = false;
      state.error = true;
    },

    logout(state) {
      state.dataAuth = undefined;
      localStorage.removeItem('cr-payment_user');
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
