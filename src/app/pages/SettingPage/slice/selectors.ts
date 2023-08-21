import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

const selectChainSlice = (state: RootState) => state.chainInfo.chainData;
export const selectChainList = createSelector([selectChainSlice], (state) => state.chains);
export const selectAtChain = createSelector([selectChainSlice], (state) => state.atChain);
const selectInfoSlice = (state: RootState) => state.info;
export const selectNotification = createSelector([selectInfoSlice], (state) => state.notification);
export const selectEmail = createSelector([selectInfoSlice], (state) => state.email);