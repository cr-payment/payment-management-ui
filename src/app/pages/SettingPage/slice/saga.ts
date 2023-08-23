import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchChainInfoSaga() {
  // try {
  //   const response = yield call(axios.get, 'your-api-url'); // Replace with your API endpoint
  //   yield put(fetchChainInfoSuccess(response.data)); // Dispatch success action with fetched data
  // } catch (error) {
  //   yield put(fetchChainInfoFailure(error)); // Dispatch failure action on error
  // }
}

export function* infoSaga() {
  // yield takeLatest(fetchChainInfo().type, fetchChainInfoSaga); // Replace with your action type
}

// _____________________________________________________________________________
// lấy dữ liệu từ server về user info section
// gửi dữ liệu từ user info section lên server (thay password nhưng chưa xử lí)

// user email lấy từ dataAuth --> lắng nghe auth thay đổi thì gửi data vào info state
// chỉ cần 1 watcher

// function* watchForStateChangeSaga() {
//   while (true) {
//     const stateData = yield select(state => state.sourceState); // Replace with your source state selector
//     yield put(updateOtherStateAction(stateData)); // Dispatch action to update other state
//   }
// }

export function* rootSaga() {}
