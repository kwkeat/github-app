import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';
import DropDownService from 'utils/dropdown';

function* addFavoriteUser({ data }) {
  try {
    const response = yield call(api.addFavoriteUser, data);
    if (response === 'SUCCESS') {
      yield put(Actions.addFavoriteUserSuccess());
      yield call(DropDownService.alertWithType, 'success', '', 'User added to favorite list.');
    } else if (response === 'EXIST') {
      yield call(DropDownService.alertWithType, 'error', '', 'User is already on favorite list.');
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
