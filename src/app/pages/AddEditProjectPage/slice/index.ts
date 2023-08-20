import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { addEditProjectSaga } from './saga';
import { AddEditProjectState, CreateProjectRequest } from './types';

export const initialState: AddEditProjectState = {
  loading: false,
  dataProject: {},
  error: false,
};

const slice = createSlice({
  name: 'addEditProject',
  initialState,
  reducers: {
    createProjectRequest(state, action: PayloadAction<CreateProjectRequest>) {
      state.loading = true;
      state.error = false;
    },
    createProjectSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.dataProject = action.payload;
    },
    createProjectError(state) {
      state.loading = false;
      state.error = true;
    },

    editProjectRequest(state, action: PayloadAction<CreateProjectRequest>) {
      state.loading = true;
      state.error = false;
    },
    editProjectSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.dataProject = action.payload;
    },
    editProjectError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: addEditProjectActions } = slice;

export const useAddEditProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: addEditProjectSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAddEditProjectSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
