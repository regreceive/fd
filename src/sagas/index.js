import { fork, all } from 'redux-saga/effects';

import { watchUser } from './userActions';

export default function* root() {
  yield all([fork(watchUser)]);
}
