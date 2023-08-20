import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.addEditProject || initialState;

export const selectAddEditProject = createSelector(
  [selectSlice],
  (state) => state
);
