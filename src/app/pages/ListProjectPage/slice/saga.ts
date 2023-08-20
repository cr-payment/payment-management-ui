import { projectApi } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { projectsActions as actions } from '.';

function* getProjectsSaga() {
  try {
    const res = yield call(projectApi.getAll);
    yield put(actions.getProjectsSuccess(res));
  } catch (error) {
    yield put(actions.getProjectsError());
  }
}

export function* projectsSaga() {
  yield takeLatest(actions.getProjectsRequest.type, getProjectsSaga);
}
