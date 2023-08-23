import { projectApi } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects'; //
import { projectActions as actions } from '.';
import { PaymentInProject } from './types';
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

function* detailProjectSaga(
  action: ReturnType<typeof actions.detailProjectRequest>
) {
  try {
    const res = yield call(projectApi.detail, action.payload);
    const detailProject = res.data[res.data.length - 1].projectDetail;
    const payments = res.data.slice(0, -1).map((payment: PaymentInProject) => ({
      ...payment,
      id: payment?.id || faker.string.uuid(),
      avatarUrl: payment?.avatarUrl || faker.image.url(),
      // name: faker.person.fullName(),
      transactionHash: sample([
        '0x53fce97a6e544699dedf697ae7e63cada4e7745dd7ac9b1d7661f922cba95d88',
        '0x0dc7b4965360f71a5bec530d48212053d499d5ea5d807b3f9cf3044d0cdf5a13',
        '0x2f863a5d0b8e41c1a9d7ed6dd29524c887086f443e8c5c2c143c9f2928860cfe',
        '0xe57e9096c096b224995b69985313c1308ce2298e92feae70ad55466d47808092',
        '0x14fba0a13b759d720ba1156eb8f167b583e35fa3cf6e63f639ddc7bb3fed0854',
        '0x708f9bf9920a9368e7d19a3cf61c19145e7555d329b1c5c58211e181c5177575',
        '0x213f1ba26e627261e406473abe61616a2d9c6aec0d786a58be462ece8abb8edf',
        '0xc7e0a88f81efc443da376e027a8441ebca91a5939b6e5a331b9d32c3b1221df0',
      ]),
      currency:
        payment?.currency ||
        sample(['ETH', 'USDT', 'SUI', 'BTC', 'SOL', 'BNB']),
    }));
    yield put(actions.detailProjectSuccess([...payments, detailProject]));
  } catch (error) {
    yield put(actions.detailProjectError());
  }
}

function* createProjectSaga(
  action: ReturnType<typeof actions.createProjectRequest>
) {
  try {
    const res = yield call(projectApi.create, action.payload);
    yield put(actions.createProjectSuccess(res.data));
  } catch (error) {
    yield put(actions.createProjectError());
  }
}

// function* editProjectSaga(
//   action: ReturnType<typeof actions.editProjectRequest>
// ) {
//   try {
//     const res = yield call(projectApi.create, action.payload);
//     yield put(actions.createProjectSuccess(res.data));
//   } catch (error) {
//     yield put(actions.createProjectError());
//   }
// }

export function* projectSaga() {
  yield takeLatest(actions.detailProjectRequest.type, detailProjectSaga);
  yield takeLatest(actions.createProjectRequest.type, createProjectSaga);
  // yield takeLatest(actions.editProjectRequest.type, editProjectSaga);
}
