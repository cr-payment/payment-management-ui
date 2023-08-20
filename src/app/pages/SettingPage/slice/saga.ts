import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { addWalletActions as actions } from './walletReducer';
import { addWalletApi } from 'api';

function* addWalletRequestSaga(
  action: ReturnType<typeof actions.addWalletRequest>
) {
  try {
    const res = yield call(addWalletApi.addWallet, action.payload);
    yield put(actions.addWalletSuccess(res.data));
  } catch (error) {
    yield put(actions.addWalletError());
  }
}
export function* addWalletSaga() {
  yield takeEvery(actions.addWalletRequest.type, addWalletRequestSaga);
}
