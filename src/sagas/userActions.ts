import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { IAction } from '../types';
import {
  currentCoastComplete,
  electricChartComplete,
  gainsDetailComplete,
  getAvailableRolesComplete,
  IAvailableRolesComplete,
  ILoginComplete,
  IQuotePriceResponse,
  IResponseSchema,
  IWalletBalanceResponse,
  loginComplete,
  logoutComplete,
  postOfferComplete,
  priceConstituteComplete,
  producerSummaryComplete,
  quotePriceComplete,
  updateRoleComplete,
  walletBalanceComplete,
  exchangeFormComplete,
  IExchangeFormResponse,
  checkComplete,
  IElectricEXChartResponse,
  ICurrentResponse,
  postTimeComplete,
  IGainsDetailResponse,
  ICheckResponse,
  dashBoardComplete,
  IDashBoardResponse,
  IGameStatus,
  gameStatusComplete,
  IGameIndex,
  gameIndexComplete,
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
  const response = yield call(request, '/config/game-index');
  const json: IGameStatus = yield call([response, 'json']);
  const index = json.data;

  const {
    user: { role },
    global: { token },
  } = yield select();
  const [power] = realTimeMutableData(role, index);
  const [, , cost] = realTimeImmutableData(role);

  return mockResponse({
    status: 'ok',
    token,
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
    json.token = (json.data || json).token;
    yield put(loginComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* logout() {
  try {
    const response = yield call(request, '/api/logout', 'include', {});

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
      call(request, '/api/user/sell/profit', 'include'),
      call(request, '/api/get-offer', 'include'),
    ]);

    const json = yield all([
      call([response[0], 'json']),
      call([response[1], 'json']),
      call([response[2], 'json']),
    ]);

    const toast = Object.keys(
      json.reduce((prev: {}, curr: IResponseSchema) => {
        if (curr.toast !== '') {
          prev[curr.toast as string] = 1;
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
        token: json[1].token,
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
      '/api/quotePrice',
      'include',
      action.payload,
    );

    const json = yield call([response, 'json']);
    yield put(postOfferComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* postTime(action: IAction) {
  try {
    const response = yield call(
      request,
      '/api/eletric/adjust',
      'include',
      action.payload,
    );

    const json: ICurrentResponse = yield call([response, 'json']);
    yield put(postTimeComplete(json));
    if (json.data) {
      json.data.list.forEach(row => {
        row.index = ((parseInt(row.index, 10) + 6) % 24) + ':00';
      });
    }
    yield put(currentCoastComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getQuotePrice() {
  try {
    const response = yield call(request, '/api/quotePrice', 'include');

    const json: IQuotePriceResponse = yield call([response, 'json']);
    yield put(quotePriceComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getWalletBalance() {
  try {
    const response = yield call(request, '/api/balance', 'include');

    const json: IWalletBalanceResponse = yield call([response, 'json']);
    yield put(walletBalanceComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getGainsDetail() {
  try {
    const response = yield call(request, '/api/eletric/earn', 'include');

    const json: IGainsDetailResponse = yield call([response, 'json']);
    json.data.list.forEach(row => {
      row.index = (row.index + 6) % 24;
    });

    yield put(gainsDetailComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getCheck() {
  try {
    const response = yield call(request, '/api/eletric/earn', 'include');

    const json: ICheckResponse = yield call([response, 'json']);
    json.data.list.forEach(row => {
      row.index = (row.index + 6) % 24;
    });

    yield put(checkComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getCurrentCoast() {
  try {
    const response = yield call(request, '/api/eletric/chart', 'include');

    const json: ICurrentResponse = yield call([response, 'json']);
    if (json.data) {
      json.data.list.forEach(row => {
        row.index = ((parseInt(row.index, 10) + 6) % 24) + ':00';
      });
    }
    yield put(currentCoastComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getElectricEXChart() {
  try {
    const response = yield call(request, '/api/eletric/ex/chart', 'include');

    const json: IElectricEXChartResponse = yield call([response, 'json']);
    if (json.data) {
      json.data.forEach(row => {
        row.index = ((parseInt(row.index, 10) + 6) % 24) + ':00';
      });
    }
    yield put(electricChartComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getPriceConstitute() {
  try {
    const response = yield call(request, '/api/price/detail', 'include');

    const json = yield call([response, 'json']);

    if (!json.data) {
      yield put(priceConstituteComplete(json));
      return;
    }
    const sum = Object.keys(json.data).reduce(
      (prev, current) => {
        const settle = prev.settle + json.data[current].settle;
        const eletric = prev.eletric + json.data[current].eletric;
        return { eletric, settle };
      },
      { eletric: 0, settle: 0 },
    );

    const list = Object.keys(json.data).map(value => ({
      item: value,
      percent:
        Math.floor((json.data[value].eletric / sum.eletric) * 100) / 100 || 0,
      quote: json.data[value].price,
    }));

    const unitPrice = sum.settle / sum.eletric || 0;
    yield put(
      priceConstituteComplete({
        ...json,
        data: { list, statistics: { unitPrice, ...sum } },
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

function* getExchangeForm() {
  try {
    const response = yield call(request, '/api/quotePrice', 'include');

    const json: IExchangeFormResponse = yield call([response, 'json']);
    yield put(exchangeFormComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getDashBoardData() {
  try {
    const response = yield call(request, '/api/storage/info', 'include');

    const json: IDashBoardResponse = yield call([response, 'json']);
    yield put(dashBoardComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getGameStatus() {
  try {
    const response = yield call(request, '/config/game-status');

    const json: IGameStatus = yield call([response, 'json']);
    yield put(gameStatusComplete(json));
  } catch (e) {
    console.log(e);
  }
}

function* getGameIndex() {
  try {
    const response = yield call(request, '/config/game-index');

    const json: IGameIndex = yield call([response, 'json']);
    yield put(gameIndexComplete(json));
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
  yield takeEvery('POST_TIME', postTime);
  yield takeEvery('GET_QUOTE_PRICE', getQuotePrice);
  yield takeEvery('GET_WALLET_BALANCE', getWalletBalance);
  yield takeEvery('GET_GAINS_DETAIL', getGainsDetail);
  yield takeEvery('GET_PRICE_CONSTITUTE', getPriceConstitute);
  yield takeEvery('GET_CURRENT_COAST', getCurrentCoast);
  yield takeEvery('GET_ELECTRIC_EX_CHART', getElectricEXChart);
  yield takeEvery('GET_EXCAHNGE_FORM', getExchangeForm);
  yield takeEvery('GET_CHECK', getCheck);
  yield takeEvery('GET_DASHBOARD_DATA', getDashBoardData);
  yield takeEvery('GET_GAME_STATUS', getGameStatus);
  yield takeEvery('GET_GAME_INDEX', getGameIndex);
}
