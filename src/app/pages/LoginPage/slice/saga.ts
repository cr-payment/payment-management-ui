import { call, put, spawn, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { authApi } from 'api';
import { fetchChainsRequest } from 'app/pages/SettingPage/slice/walletReducer';

function* loginRequestSaga(action: ReturnType<typeof actions.loginRequest>) {
  try {
    const res = yield call(authApi.login, action.payload);
    yield put(actions.loginSuccess(res));
    // yield spawn(fetchChainsAfterLogin);
  } catch (error) {
    yield put(actions.loginError());
  }
}
// function* fetchChainsAfterLogin() {
//   try {
//     yield call(fetchChainsRequest); // Dispatch the fetchChainsRequest action
//   } catch (error) {
//     yield call(console.log, error);
//   }
// }

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, loginRequestSaga);
}
