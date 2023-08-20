import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { projectSaga } from './saga';
import { ProjectState } from './types';

export const initialState: ProjectState = {
  loading: false,
  dataProject: {},
  error: false,
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    detailProjectRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = false;
    },
    detailProjectSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.dataProject = action.payload;
    },
    detailProjectError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: projectActions } = slice;

export const useProjectSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProjectSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
