exports.login = ctx => {
  const json = ctx.request.body;
  const { username } = json;
  ctx.body = {
    status: 'ok',
    data: {
      token: '123',
      username,
      type: -1,
      role: 0,
    },
  };
};
