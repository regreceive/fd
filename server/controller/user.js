exports.login = ctx => {
  const json = ctx.request.body;
  const { username } = json;
  ctx.body = {
    status: 'ok',
    data: {
      token: '123',
      username,
      role: 1,
      toast: 'success.login',
    },
  };
};
