import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* fetchFavoriteUsers() {
  try {
    const response = yield call(api.fetchFavoriteUsers);
    const favoriteUsers = JSON.parse(JSON.stringify(response));
    if (favoriteUsers) {
      yield put(Actions.fetchFavoriteUsersSuccess(favoriteUsers));
    }
  } catch (error) {
    yield put(Actions.fetchFavoriteUsersFail(error));
  }
}

function* watchFetchFavoriteUsers() {
  yield takeLatest(Actions.FETCH_FAVORITE_USERS, fetchFavoriteUsers);
}

export default function* user() {
  yield all([
    fork(watchFetchFavoriteUsers),
  ]);
}
