exports.login = ctx => {
  const json = ctx.request.body;
  const { username } = json;
  let data;
  if (username === 'a@s.com') {
    data = {token: '', role: 0, toast: 'fail.account_not_found'};
  } else {
    data = {token: '123', username, role: 1, toast: 'success.login'};
  }
  ctx.body = {
    status: 'ok',
    data
  };
};
