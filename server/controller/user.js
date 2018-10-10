exports.login = async ctx => {
  const json = ctx.request.body;
  const { username } = json;
  let data;
  if (username === 'a@s.com') {
    data = {token: '', role: 0, toast: 'fail.account_not_found'};
  } else {
    data = {token: '123', username, role: 1, toast: 'success.login'};
  }

  await sleep();
  ctx.body = {
    status: 'ok',
    data
  };
};

function sleep() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1000)
  })
}
