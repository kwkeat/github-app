import { all, fork } from 'redux-saga/effects';
import fetch from './fetch';

export default function* auth() {
  yield all([
    fork(fetch),
  ]);
}
