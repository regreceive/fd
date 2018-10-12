import { call, put, select, takeEvery } from 'redux-saga/effects';

import { IAction } from '../types';
import {
  getAvailableRolesComplete,
  loginComplete,
  updateRoleComplete,
} from '../actions/userActions';

const API = process.env.REACT_APP_API;

// fetch基础上包装了一层
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
    const response = yield call(request, '/login', 'omit', action.payload);

    const json = yield call([response, 'json']);
    yield put(loginComplete(json.data));
  } catch (e) {
    console.log(e);
  }
}

function* getAvailableRoles() {
  try {
    const response = yield call(request, '/get-available-roles', 'include');

    const json = yield call([response, 'json']);
    yield put(getAvailableRolesComplete(json.data));
  } catch (e) {
    console.log(e);
  }
}

function* updateRole(action: IAction) {
  try {
    const response = yield call(
      request,
      '/update-role',
      'include',
      action.payload,
    );

    const json = yield call([response, 'json']);
    yield put(updateRoleComplete(json.data));
  } catch (e) {
    console.log(e);
  }
}

export function* watchUser() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('GET_AVAILABLE_ROLES', getAvailableRoles);
  yield takeEvery('UPDATE_ROLE', updateRole);
}
