import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* fetchUsers() {
  try {
    const response = yield call(api.fetchUsers);
    const json = response && response.data;
    if (response.status === 200) {
      yield put(Actions.fetchUsersSuccess(json));
    }
  } catch (error) {
    yield put(Actions.fetchUsersFail(error));
  }
}

function* watchFetchUsers() {
  yield takeLatest(Actions.FETCH_USERS, fetchUsers);
}

export default function* user() {
  yield all([
    fork(watchFetchUsers),
  ]);
}
