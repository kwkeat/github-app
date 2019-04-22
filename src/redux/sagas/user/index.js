import { all, fork } from 'redux-saga/effects';
import favorite from './favorite';
import search from './search';
import add from './add';
import remove from './remove';

export default function* auth() {
  yield all([
    fork(favorite),
    fork(search),
    fork(add),
    fork(remove),
  ]);
}
