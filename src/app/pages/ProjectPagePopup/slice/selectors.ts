import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.bill || initialState;

export const selectBill = createSelector([selectSlice], (state) => state);

export const selectBillData = createSelector(
  [selectSlice],
  (state) => state.billData
);
