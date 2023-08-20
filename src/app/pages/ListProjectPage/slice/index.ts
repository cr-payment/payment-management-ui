import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { projectsSaga } from './saga';
import { ProjectsState } from './types';

export const initialState: ProjectsState = {
  loading: false,
  dataProjects: [],
  error: false,
};

const slice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getProjectsRequest(state) {
      state.loading = true;
      state.error = false;
    },
    getProjectsSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.dataProjects = action.payload;
    },
    getProjectsError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { actions: projectsActions } = slice;

export const useProjectsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: projectsSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useProjectsSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
