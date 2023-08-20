import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.projects || initialState;

export const selectProjects = createSelector([selectSlice], (state) => state);
