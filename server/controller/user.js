function sleep() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });
}

exports.login = async ctx => {
  const json = ctx.request.body;
  const { username } = json;
  let data;
  if (username === 'a@s.com') {
    data = { token: '', role: '', side: '', toast: 'fail.account_not_found' };
  } else {
    data = {
      token: '123',
      username,
      role: '',
      side: '',
      toast: 'success.login',
    };
  }

  await sleep();
  ctx.body = {
    status: 'ok',
    data,
  };
};

exports.availableRoles = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    data: {
      token: '123',
      toast: '',
      roles: [
        { role: 'SCHOOL', available: false, side: 'BUY' },
        { role: 'FACTORY', available: true, side: 'BUY' },
        { role: 'MALL', available: true, side: 'BUY' },
        { role: 'COMMUNITY', available: true, side: 'BUY' },
        { role: 'PHOTOVOLTAIC', available: true, side: "SELL" },
        { role: 'WIND', available: true, side: "SELL" },
        { role: 'BATTERY', available: true, side: "SELL" },
        { role: 'GAS', available: true, side: "SELL" },
      ],
    },
  };
};

exports.updateRole = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    data: {
      token: '123',
      toast: '',
      side: 'SELL',
      role: 'SCHOOL'
    },
  };
};
