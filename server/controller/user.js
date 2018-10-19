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

exports.currentState = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      power: 10,
      cost: 0.36,
      efficiency: 1,
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
      vol: 12,
      price: 0.31,
      amount: 12500,
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
      pv: 0.1,
      cchp: 0.1,
      storage: 0.1,
      wind: 0.1,
      grid: 0.6,
    },
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
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      count: 50000,
      earning: 5000,
      netEarning: 24000,
    },
  };
};

exports.gainsCard = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      {
        count: 50000,
        earning: 3000,
        netEarning: 100,
        time: Date.now(),
      },
      {
        count: 50000,
        earning: 3000,
        netEarning: 0,
        time: Date.now(),
      },
    ],
  };
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
      { uid: 123, index: 1, eletric: 100, price: 100 },
      { uid: 123, index: 2, eletric: 100, price: 100 },
    ],
  };
};

exports.getChartData = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      {
        uid: '',
        electric: 200,
        price: 10,
        creatime: '0:00',
        index: 0,
      },
      {
        uid: '',
        electric: 200,
        price: 4,
        creatime: '1:00',
        index: 1,
      },
      {
        uid: '',
        electric: 400,
        price: 6,
        creatime: '2:00',
        index: 2,
      },
      {
        uid: '',
        electric: 300,
        price: 10,
        creatime: '3:00',
        index: 3,
      },
      {
        uid: '',
        electric: 20,
        price: 19,
        creatime: '4:00',
        index: 4,
      },
      {
        uid: '',
        electric: 210,
        price: 8,
        creatime: '5:00',
        index: 5,
      },
      {
        uid: '',
        electric: 150,
        price: 10,
        creatime: '6:00',
        index: 6,
      },
      {
        uid: '',
        electric: 177,
        price: 15,
        creatime: '7:00',
        index: 7,
      },
      {
        uid: '',
        electric: 210,
        price: 8,
        creatime: '8:00',
        index: 8,
      },
      {
        uid: '',
        electric: 200,
        price: 10,
        creatime: '9:00',
        index: 9,
      },
      {
        uid: '',
        electric: 230,
        price: 11,
        creatime: '10:00',
        index: 10,
      },
      {
        uid: '',
        electric: 80,
        price: 3,
        creatime: '11:00',
        index: 11,
      },
      {
        uid: '',
        electric: 400,
        price: 30,
        creatime: '12:00',
        index: 12,
      },
      {
        uid: '',
        electric: 66,
        price: 7,
        creatime: '13:00',
        index: 13,
      },
      {
        uid: '',
        electric: 55,
        price: 9,
        creatime: '14:00',
        index: 14,
      },
      {
        uid: '',
        electric: 163,
        price: 20,
        creatime: '15:00',
        index: 15,
      },
      {
        uid: '',
        electric: 330,
        price: 6,
        creatime: '16:00',
        index: 16,
      },
      {
        uid: '',
        electric: 250,
        price: 9,
        creatime: '17:00',
        index: 17,
      },
      {
        uid: '',
        electric: 143,
        price: 52,
        creatime: '18:00',
        index: 18,
      },
      {
        uid: '',
        electric: 80,
        price: 16,
        creatime: '19:00',
        index: 19,
      },
      {
        uid: '',
        electric: 210,
        price: 4,
        creatime: '20:00',
        index: 20,
      },
      {
        uid: '',
        electric: 124,
        price: 10,
        creatime: '21:00',
        index: 21,
      },
      {
        uid: '',
        electric: 180,
        price: 4,
        creatime: '22:00',
        index: 22,
      },
      {
        uid: '',
        electric: 240,
        price: 31,
        creatime: '23:00',
        index: 23,
      },
    ],
  };
};
