import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { projectsSaga } from './saga';
import { ProjectsState } from './types';
import projects from '_mock/project';
import { Project } from 'app/pages/ProjectPage/slice/types';

export const initialState: ProjectsState = {
  loading: false,
  dataProjects: [...projects],
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
    getProjectsSuccess(state, action: PayloadAction<Project[]>) {
      state.loading = false;
      const newProjects = [...action.payload, ...projects];
      const uniqueProjects = newProjects.filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.id === project.id)
      );
      state.dataProjects = uniqueProjects;
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
