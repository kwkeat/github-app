import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import common from './common';
import user from './user';

export default function* root() {
  yield all([
    fork(auth),
    fork(common),
    fork(user),
  ]);
}
