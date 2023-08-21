import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { walletActions as actions } from './walletReducer';
import { addWalletApi } from 'api';
import fetchChainApi from 'api/fetchChainsApi';

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

function* fetchChainsRequestSaga(
  action: ReturnType<typeof actions.fetchChainsRequest>
) {
  try {
    const res = yield call(fetchChainApi.fetchChains);
    yield put(actions.fetchChainsSuccess(res));
  } catch (error) {
    // yield console.log(error);
    yield put(actions.fetchChainsError());
  }
}

export function* fetchChainsSaga() {
  yield takeLatest(actions.fetchChainsRequest.type, fetchChainsRequestSaga);
} 