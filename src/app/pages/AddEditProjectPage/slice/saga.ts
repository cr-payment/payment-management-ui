import { projectApi } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addEditProjectActions as actions } from '.';

function* createProjectSaga(
  action: ReturnType<typeof actions.createProjectRequest>
) {
  try {
    const res = yield call(projectApi.create, action.payload);
    yield put(actions.createProjectSuccess(res));
  } catch (error) {
    yield put(actions.createProjectError());
  }
}

// function* editProjectSaga(
//   action: ReturnType<typeof actions.editProjectRequest>
// ) {
//   try {
//     const res = yield call(projectApi.create, action.payload);
//     yield put(actions.createProjectSuccess(res));
//   } catch (error) {
//     yield put(actions.createProjectError());
//   }
// }

export function* addEditProjectSaga() {
  yield takeLatest(actions.createProjectRequest.type, createProjectSaga);
  // yield takeLatest(actions.editProjectRequest.type, editProjectSaga);
}
