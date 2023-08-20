import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { authApi } from 'api';

function* loginRequestSaga(action: ReturnType<typeof actions.loginRequest>) {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(actions.loginSuccess(res));
  } catch (error) {
    yield put(actions.loginError());
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, loginRequestSaga);
}
