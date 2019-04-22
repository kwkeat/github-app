import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* addFavoriteUser({ data }) {
  try {
    const response = yield call(api.addFavoriteUser, data);
    console.log('response');
    if (response) {
      yield put(Actions.addFavoriteUserSuccess());
    }
  } catch (error) {
    yield put(Actions.addFavoriteUserFail(error));
  }
}

function* watchAddFavoriteUser() {
  yield takeLatest(Actions.ADD_FAVORITE_USER, addFavoriteUser);
}

export default function* user() {
  yield all([
    fork(watchAddFavoriteUser),
  ]);
}
