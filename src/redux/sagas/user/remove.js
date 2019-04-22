import {
  takeLatest, all, fork, put, call,
} from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';
import AppNavigationService from 'navigator/app/AppNavigationService';
import DropDownService from 'utils/dropdown';

function* removeFavoriteUser({ id }) {
  try {
    const response = yield call(api.removeFavoriteUser, id);
    if (response === 'SUCCESS') {
      yield put(Actions.removeFavoriteUserSuccess());
      yield call(DropDownService.alertWithType, 'success', '', 'User removed from favorite list.');
      yield call(AppNavigationService.navigate, 'Dashboard');
    } else if (response === 'EXIST') {
      yield call(DropDownService.alertWithType, 'error', '', 'User is not on favorite list.');
    }
  } catch (error) {
    yield put(Actions.removeFavoriteUserFail(error));
  }
}

function* watchRemoveFavoriteUser() {
  yield takeLatest(Actions.REMOVE_FAVORITE_USER, removeFavoriteUser);
}

export default function* user() {
  yield all([
    fork(watchRemoveFavoriteUser),
  ]);
}
