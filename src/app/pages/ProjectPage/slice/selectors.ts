import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.project || initialState;

export const selectProject = createSelector([selectSlice], (state) => state);
