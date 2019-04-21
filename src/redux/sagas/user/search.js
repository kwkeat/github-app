import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* searchUsers({ username }) {
  try {
    const response = yield call(api.searchUsers, username);
    const json = response && response.data;
    if (response.status === 200) {
      yield put(Actions.searchUsersSuccess(json));
    }
  } catch (error) {
    yield put(Actions.searchUsersFail(error));
  }
}

function* watchSearchUsers() {
  yield takeLatest(Actions.SEARCH_USERS, searchUsers);
}

export default function* user() {
  yield all([
    fork(watchSearchUsers),
  ]);
}
