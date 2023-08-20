import { projectApi } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects'; //
import { projectActions as actions } from '.';

function* detailProjectSaga(
  action: ReturnType<typeof actions.detailProjectRequest>
) {
  try {
    const res = yield call(projectApi.detail, action.payload);
    yield put(actions.detailProjectSuccess(res));
  } catch (error) {
    yield put(actions.detailProjectError());
  }
}

export function* projectSaga() {
  yield takeLatest(actions.detailProjectRequest.type, detailProjectSaga);
}
