import { call, put, select, takeEvery } from 'redux-saga/effects';

import { IAction } from '../types';
import { loginComplete } from '../actions/userActions';

const API = process.env.REACT_APP_API;

export function* request(
  uri: string,
  credentials?: RequestInit['credentials'],
  body?: {},
) {
  const init: RequestInit = {};
  init.headers = new Headers();
  if (credentials === 'include') {
    const {
      user: { token },
    } = yield select();
    init.headers.append('token', token);
  }
  if (body) {
    init.body = JSON.stringify(body);
    init.method = 'post';
    init.headers.append('Accept', 'application/json');
    init.headers.append('Content-Type', 'application/json');
  }

  return yield fetch(API + uri, init);
}

function* login(action: IAction) {
  try {
    const response = yield call(request, '/login', 'include', action.payload);

    const json = yield call([response, 'json']);
    yield put(loginComplete(json.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchUser() {
  yield takeEvery('LOGIN', login);
}
