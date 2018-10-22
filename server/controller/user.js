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
    data:[
      {
        item: '光伏发电',
        count: 0.4,
      },
      {
        item: '光内燃机发电',
        count: 0.21,
      },
      {
        item: '大电网',
        count: 0.17,
      },
      {
        item: '能源发电',
        count: 0.13,
      },
      {
        item: '储能发电',
        count: 0.09,
      },
    ],
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
  if(SIDE=='BUY'){
    ctx.body = {
      status: 'ok',
      token: '123',
      toast: '',
      data:{
        total:{
          uid: 123,
          price: 100,
          eletric: 100,
        },
        list:[{
          uid: 123,
          index: 10,
          eletric: 100,
          price: 100,
        }]
      } 
    };
  }else{
    ctx.body = {
      status: 'ok',
      token: '123',
      toast: '',
      data:{
        total:{
          uid: 123,
          eletric: 1000,
          userTotal: 100,
          otherTotal:100
        },
        list:[{
          uid: 123,
          index: 10,
          eletric: 100,
          userTotal: 100,
          otherTotal:100
        }]
      } 
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
    data:{
      "total":{"pre":100, "after":200,"eletric":100}, 
      "list":[{"actual":100,"price":0.1,"index":0},{"actual":100,"price":0.1,"index":1}],
      }
  };
};

exports.exchangeForm = async ctx => {
  await sleep();
  ctx.body = {
    status: 'ok',
    token: '123',
    toast: '',
    data:
     [
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
      ]


  }
};

