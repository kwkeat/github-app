import { all, fork } from 'redux-saga/effects';
import fetch from './fetch';
import search from './search';

export default function* auth() {
  yield all([
    fork(fetch),
    fork(search),
  ]);
}
