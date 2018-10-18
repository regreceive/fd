import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { IAction } from '../types';
import {
  getAvailableRolesComplete,
  IAvailableRolesComplete,
  ILoginComplete,
  IPriceConstituteResponse,
  IQuotePriceResponse,
  IResponseSchema,
  IWalletBalanceResponse,
  loginComplete,
  logoutComplete,
  postOfferComplete,
  priceConstituteComplete,
  producerSummaryComplete,
  currentCoastComplete,
  quotePriceComplete,
  updateRoleComplete,
  walletBalanceComplete,
  gainsDetailComplete,
} from '../actions/userActions';
import { realTimeImmutableData, realTimeMutableData } from '../pages/data';

const API = process.env.REACT_APP_API;

// fetch基础上包装了一层
function* request(
  uri: string,
  credentials?: RequestInit['credentials'],
  body?: {},
) {
  const init: RequestInit = {};
  init.headers = new Headers();
  if (credentials === 'include') {
    const {
      global: { token },
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

function mockResponse(json: object) {
  return new Response(
    new Blob([JSON.stringify(json)], { type: 'application/json' }),
    { status: 200 },
  );
}

function* mockCurrentState() {
  const {
    user: { role },
  } = yield select();
  const [power] = realTimeMutableData(role);
  const [, , cost] = realTimeImmutableData(role);

  return mockResponse({
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      power,
      cost,
    },
  });
}

function* login(action: IAction) {
  try {
    const response = yield call(request, '/login', 'omit', action.payload);

    const json: ILoginComplete = yield call([response, 'json']);
    json.token = json.data.token;
    yield put(loginComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* logout() {
  try {
    const response = yield call(request, '/api/logout', 'include');

    const json = yield call([response, 'json']);
    yield put(logoutComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getAvailableRoles() {
  try {
    const response = yield call(request, '/config/role', 'include');

    const json: IAvailableRolesComplete = yield call([response, 'json']);
    yield put(getAvailableRolesComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* updateRole(action: IAction) {
  try {
    const response = yield call(
      request,
      '/api/update-role',
      'include',
      action.payload,
    );

    const json = yield call([response, 'json']);
    yield put(updateRoleComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getProducerSummary() {
  try {
    const response = yield all([
      // call(request, '/get-current-state', 'include'),
      call(mockCurrentState),
      call(request, '/get-earns', 'include'),
      call(request, '/get-offer', 'include'),
    ]);

    const json = yield all([
      call([response[0], 'json']),
      call([response[1], 'json']),
      call([response[2], 'json']),
    ]);

    const toast = Object.keys(
      json.reduce((prev: {}, curr: IResponseSchema) => {
        if (curr.toast !== '') {
          prev[curr.toast as 'imNotEmpty'] = 1;
        }
        return prev;
      }, {}),
    );
    const data = {
      currentState: json[0].data,
      earns: json[1].data,
      offer: json[2].data,
    };

    yield put(
      producerSummaryComplete({
        status: 'ok',
        token: json[0].token,
        toast,
        data,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

function* postOffer(action: IAction) {
  try {
    const response = yield call(
      request,
      '/post-offer',
      'include',
      action.payload,
    );

    const json = yield call([response, 'json']);
    yield put(postOfferComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getQuotePrice() {
  try {
    const response = yield call(request, '/quotePrice', 'include');

    const json: IQuotePriceResponse = yield call([response, 'json']);
    yield put(quotePriceComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getWalletBalance() {
  try {
    const response = yield call(request, '/balance', 'include');

    const json: IWalletBalanceResponse = yield call([response, 'json']);
    yield put(walletBalanceComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getGainsDetail() {
  try {
    const response = yield all([
      call(request, '/gainsDetail', 'include'),
      call(request, '/gainsCard', 'include'),
    ]);

    const json = yield all([
      call([response[0], 'json']),
      call([response[1], 'json']),
    ]);
    const toast = Object.keys(
      json.reduce((prev: {}, curr: IResponseSchema) => {
        if (curr.toast !== '') {
          prev[curr.toast as 'imNotEmpty'] = 1;
        }
        return prev;
      }, {}),
    );
    const data = { gainsDetail: json[0].data, gainsCard: json[1].data };
    yield put(
      gainsDetailComplete({
        status: 'ok',
        token: json[0].token,
        toast,
        data,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

function* getCurrentCoast() {
  try {
    const response = yield all([
      call(request, '/get-current-coast', 'include'),
      call(request, '/api/eletric/chart', 'include'),
    ]);

    const json = yield all([
      call([response[0], 'json']),
      call([response[1], 'json']),
    ]);
    const toast = Object.keys(
      json.reduce((prev: {}, curr: IResponseSchema) => {
        if (curr.toast !== '') {
          prev[curr.toast as 'imNotEmpty'] = 1;
        }
        return prev;
      }, {}),
    );
    const data = { currentCoast: json[0].data, getChartData: json[1].data };
    yield put(
      currentCoastComplete({
        status: 'ok',
        token: json[0].token,
        toast,
        data,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

function* getPriceConstitute() {
  try {
    const response = yield call(request, '/api/price/detail', 'include');

    const json: IPriceConstituteResponse = yield call([response, 'json']);
    yield put(priceConstituteComplete(json));
  } catch (e) {
    console.log(e);
  }
}

export function* watchUser() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('LOGOUT', logout);
  yield takeEvery('GET_AVAILABLE_ROLES', getAvailableRoles);
  yield takeEvery('UPDATE_ROLE', updateRole);
  yield takeEvery('GET_PRODUCER_SUMMARY', getProducerSummary);
  yield takeEvery('POST_OFFER', postOffer);
  yield takeEvery('GET_QUOTE_PRICE', getQuotePrice);
  yield takeEvery('GET_WALLET_BALANCE', getWalletBalance);
  yield takeEvery('GET_GAINS_DETAIL', getGainsDetail);
  yield takeEvery('GET_PRICE_CONSTITUTE', getPriceConstitute);
  yield takeEvery('GET_CURRENT_COAST', getCurrentCoast);
}
