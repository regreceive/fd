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

exports.availableRoles = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: [
      { role: 'SCHOOL', available: false, side: 'BUY' },
      { role: 'FACTORY', available: true, side: 'BUY' },
      { role: 'MALL', available: true, side: 'BUY' },
      { role: 'COMMUNITY', available: true, side: 'BUY' },
      { role: 'PHOTOVOLTAIC', available: true, side: 'SELL' },
      { role: 'WIND', available: true, side: 'SELL' },
      { role: 'BATTERY', available: true, side: 'SELL' },
      { role: 'GAS', available: true, side: 'SELL' },
    ],
  };
};

exports.updateRole = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: {
      side: 'SELL',
      role: 'PHOTOVOLTAIC',
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
    data: 10
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
    }

  };
};

exports.gainsCard = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data: 
     [
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
      ]
    

  }
};