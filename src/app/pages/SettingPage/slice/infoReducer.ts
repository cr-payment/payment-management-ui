import { createSlice } from '@reduxjs/toolkit';
import { useInjectReducer } from 'redux-injectors';
export interface InfoState {
  email: string;
  password: string;
  notification: boolean;
}

const initialState: InfoState = {
  email: '',
  password: 'mypassword',
  notification: true,
};
const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    changeEmail(state, action) {
      const newEmail = action.payload;
      state.email = newEmail;
    },
    changePassword(state, action) {
      const newPassword = action.payload;
      state.password = newPassword;
    },
    toggleNotification(state, action) {
      const receiveNotification = !action.payload;
      state.notification = receiveNotification;
    },
  },
});

export const useInfoSlice = () => {
  useInjectReducer({ key: infoSlice.name, reducer: infoSlice.reducer });
  return { actions: infoSlice.actions };
};
export const { changeEmail, changePassword, toggleNotification } =
  infoSlice.actions;
export default infoSlice.reducer;
