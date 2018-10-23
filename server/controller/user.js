let SIDE = '';
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

exports.login = async ctx => {
  const json = ctx.request.body;
  const { username } = json;
  let data;
  let toast = 'success.login';
  let token = '123';

  if (username === 'a@s.com') {
    data = { role: '', side: '', token: '' };
    toast = 'fail.account_not_found';
    token = '';
  } else {
    data = {
      token: '123',
      username,
      role: '',
      side: '',
    };
  }

  await sleep();
  ctx.body = {
    status: 'ok',
    token,
    toast,
    data,
  };
};

exports.logout = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '',
    toast: 'success.logout',
    role: '',
    side: '',
  };
};

const roles = [
  { role: 'SCHOOL', available: false, side: 'BUY' },
  { role: 'FACTORY', available: true, side: 'BUY' },
  { role: 'MALL', available: true, side: 'BUY' },
  { role: 'COMMUNITY', available: true, side: 'BUY' },
  { role: 'PHOTOVOLTAIC', available: true, side: 'SELL' },
  { role: 'WIND', available: true, side: 'SELL' },
  { role: 'BATTERY', available: true, side: 'SELL' },
  { role: 'GAS', available: true, side: 'SELL' },
];

exports.availableRoles = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: roles,
  };
};

exports.updateRole = async ctx => {
  await sleep();
  const { role } = ctx.request.body;

  const { side } = roles.find(row => {
    return row.role === role;
  });

  SIDE = side;

  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      side,
      role,
    },
  };
};


exports.earns = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      eletric: 0,
      price: 0,
    },
  };
};

exports.offer = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      price: 0.23,
      timestamp: Date.now(),
    },
  };
};

exports.postOffer = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: 'success.offer',
  };
};

exports.postTime = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: 'success.offer',
    data:  {
      total: { pre: 100, after: 200, eletric: 100},
      list: [
        { actual: 10, price: 0.7, index: 0 },
        { actual: 60, price: 0.1, index: 1 },
        { actual: 66, price: 0.2, index: 2 },
        { actual: 50, price: 0.3, index: 3 },
        { actual: 40, price: 0.6, index: 4 },
      ],
    },
  };
};

exports.quotePrice = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      {
        amount: 5000,
        earning: 3000,
        status: 0,
        time: Date.now(),
      },
      {
        amount: 5000,
        earning: 3000,
        status: 1,
        time: Date.now(),
      },
    ],
  };
};

exports.balance = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: 10,
  };
};

exports.priceConstitute = async ctx => {
  await sleep();
  ctx.set({
    token: '123',
  });

  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      "SCHOOL": { "price": 10, "eletric": 10, "settle": 100 },
      "FACTORY": { "price": 10, "eletric": 10, "settle": 100 }
    }
  };
};

exports.exchange = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      currentpower: 10,
      before: 1540,
      after: 1200,
    },
  };
};

exports.gainsDetail = async ctx => {
  await sleep();
  if (SIDE === 'BUY') {
    ctx.body = {
      status: 'ok',
      token: '123',
      toast: '',
      data: {
        total: {
          uid: 123,
          price: 100,
          eletric: 100,
        },
        list: [
          {
            uid: 123,
            index: 10,
            eletric: 100,
            price: 100,
          },
        ],
      },
    };
  } else {
    ctx.body = {
      status: 'ok',
      token: '123',
      toast: '',
      data: {
        total: {
          uid: 123,
          eletric: 1000,
          userTotal: 100,
          otherTotal: 100,
        },
        list: [
          {
            uid: 123,
            index: 10,
            eletric: 100,
            userTotal: 100,
            otherTotal: 100,
          },
        ],
      },
    };
  }
};

exports.exChart = async ctx => {
  await sleep();
  ctx.set({
    token: '123',
  });
  ctx.body = {
    status: 'ok',
    toast: '',
    data: [
      { uid: 123, index: 0, eletric: 90, price: 80 },
      { uid: 123, index: 1, eletric: 70, price: 100 },
      { uid: 123, index: 2, eletric: 60, price: 100 },
      { uid: 123, index: 3, eletric: 50, price: 100 },
      { uid: 123, index: 4, eletric: 40, price: 100 },
      { uid: 123, index: 5, eletric: 30, price: 90 },
      { uid: 123, index: 6, eletric: 20, price: 90 },
      { uid: 123, index: 7, eletric: 10, price: 90 },
      { uid: 123, index: 8, eletric: 0, price: 100 },
      { uid: 123, index: 9, eletric: 20, price: 80 },
      { uid: 123, index: 10, eletric: 30, price: 80 },
      { uid: 123, index: 11, eletric: 40, price: 100 },
      { uid: 123, index: 12, eletric: 50, price: 70 },
      { uid: 123, index: 13, eletric: 60, price: 100 },
      { uid: 123, index: 14, eletric: 70, price: 100 },
      { uid: 123, index: 15, eletric: 80, price: 100 },
      { uid: 123, index: 16, eletric: 90, price: 100 },
      { uid: 123, index: 17, eletric: 100, price: 100 },
      { uid: 123, index: 18, eletric: 141, price: 100 },
      { uid: 123, index: 19, eletric: 120, price: 80 },
      { uid: 123, index: 20, eletric: 130, price: 70 },
      { uid: 123, index: 21, eletric: 140, price: 80 },
      { uid: 123, index: 22, eletric: 150, price: 60 },
      { uid: 123, index: 23, eletric: 160, price: 50 },
    ],
  };
};

exports.getChartData = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      total: { pre: 100, after: 200, eletric: 100 },
      list: [
        { actual: 100, price: 0.1, index: 0 },
        { actual: 100, price: 0.1, index: 1 },
      ],
    },
  };
};

exports.exchangeForm = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      {
        count: 50000,
        price: 3000,
        time: Date.now(),
      },
      {
        count: 50000,
        price: 3000,
        time: Date.now(),
      },
    ],
  };
};
