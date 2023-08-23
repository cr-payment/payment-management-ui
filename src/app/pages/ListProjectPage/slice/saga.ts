import { faker } from '@faker-js/faker';
import { projectApi } from 'api';
import { Project } from 'app/pages/ProjectPage/slice/types';
import { sample } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import { projectsActions as actions } from '.';

function* getProjectsSaga() {
  try {
    const res = yield call(projectApi.getAll);
    const payload = res.data.map((project: Project) => ({
      ...project,
      id: (project?.id || '').toString(),
      avatarUrl: project?.avatarUrl || faker.image.url(),
      noTransaction: project?.noTransaction || faker.finance.amount(10, 250, 0),
      type: project?.type || sample(['Payment', 'Subscribe']),
      totalEarned: project?.totalEarned || faker.finance.amount(1000, 5000, 0),
      createdAt: new Date(+(project?.createdAt || 0))
        .toISOString()
        .slice(0, 10),
    }));

    yield put(actions.getProjectsSuccess(payload));
  } catch (error) {
    yield put(actions.getProjectsError());
  }
}

export function* projectsSaga() {
  yield takeLatest(actions.getProjectsRequest.type, getProjectsSaga);
}
