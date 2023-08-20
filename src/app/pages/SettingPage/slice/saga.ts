export {};
// lấy dữ liệu từ server về wallet initialState
// gửi dữ liệu từ wallet state lên server
// import { call, put, takeLatest } from 'redux-saga/effects';
// import { fetchChainInfoSuccess, fetchChainInfoFailure } from './walletSlice'; // Import your action creators
// import axios from 'axios'; // Import your HTTP library of choice

// function* fetchChainInfoSaga() {
//   try {
//     const response = yield call(axios.get, 'your-api-url'); // Replace with your API endpoint
//     yield put(fetchChainInfoSuccess(response.data)); // Dispatch success action with fetched data
//   } catch (error) {
//     yield put(fetchChainInfoFailure(error)); // Dispatch failure action on error
//   }
// }

// export function* walletSaga() {
//   yield takeLatest(fetchChainInfo().type, fetchChainInfoSaga); // Replace with your action type
// }

// _____________________________________________________________________________
// lấy dữ liệu từ server về user info section
// gửi dữ liệu từ user info section lên server (thay password nhưng chưa xử lí)

// user email lấy từ dataAuth --> lắng nghe auth thay đổi thì gửi data vào info state
// chỉ cần 1 watcher
// import { takeLatest, select, put } from 'redux-saga/effects';
// import { updateOtherStateAction } from './otherStateSlice'; // Import the action to update the other state

// function* watchForStateChangeSaga() {
//   while (true) {
//     const stateData = yield select(state => state.sourceState); // Replace with your source state selector
//     yield put(updateOtherStateAction(stateData)); // Dispatch action to update other state
//   }
// }

// export function* rootSaga() {
//   yield takeLatest('WATCH_FOR_STATE_CHANGE', watchForStateChangeSaga); // Replace with your action type
// }
