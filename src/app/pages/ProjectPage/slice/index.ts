import { PayloadAction } from '@reduxjs/toolkit';
import payments from '_mock/payment';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { projectSaga } from './saga';
import {
  CreateProjectRequest,
  PaymentInProject,
  PaymentInProjectAndProject,
  Project,
  ProjectState,
} from './types';

export const initialState: ProjectState = {
  loading: false,
  dataPayments: [...payments],
  dataProject: {},
  dataAddProject: {},
  dataEditProject: {},
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
    detailProjectSuccess(
      state,
      action: PayloadAction<PaymentInProjectAndProject>
    ) {
      state.loading = false;
      state.dataProject = action.payload[action.payload.length - 1];
      const newPayments = [
        ...action.payload.slice(0, -1),
        ...payments,
      ] as PaymentInProject[];
      const uniquePayments = newPayments.filter(
        (payment, index, self) =>
          index === self.findIndex((p) => p.id === payment.id)
      );
      state.dataPayments = uniquePayments;
    },
    detailProjectError(state) {
      state.loading = false;
      state.error = true;
    },

    createProjectRequest(state, action: PayloadAction<CreateProjectRequest>) {
      state.loading = true;
      state.error = false;
    },
    createProjectSuccess(state, action: PayloadAction<Project>) {
      state.loading = false;
      state.dataAddProject = action.payload;
      state.dataPayments = [];
    },
    createProjectError(state) {
      state.loading = false;
      state.error = true;
    },

    editProjectRequest(state, action: PayloadAction<CreateProjectRequest>) {
      state.loading = true;
      state.error = false;
    },
    editProjectSuccess(state, action: PayloadAction<Project>) {
      state.loading = false;
      state.dataEditProject = action.payload;
    },
    editProjectError(state) {
      state.loading = false;
      state.error = true;
    },

    clearDataProject(state) {
      state.dataProject = {};
      state.dataAddProject = {};
      state.dataEditProject = {};
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
