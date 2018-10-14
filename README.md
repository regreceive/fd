混合应用

## 预置命令

安装

```shell
$ yarn install
```

运行

```shell
$ yarn start
```

带调试(sourcemap 和 css 原命名)打包

```shell
$ yarn build
```

启动伪服务端（提供 http 和 ws 测试数据）

```shell
$ yarn fake-server
```

产品打包

```shell
$ yarn build:release
```

## API

### 登录

POST /api/login

```js
{"username":"aaa@sina.com","password":"111"}
```

响应

```js
{
  "status":"ok",
  "data":{
     token: '123',
     username: '',
     role: '',
     side: '',
     toast: 'success.login',
   }
}
```

- token 登录身份，用于之后受保护的数据交互
- username 回传用户名
- role 角色
- side 角色性质
- toast 客户端显示的提示信息，可以是空字符串，也可以是以下几种：

| toast                   | 说明       |
| ----------------------- | ---------- |
| success.login           | 登录成功   |
| fail.account_not_found  | 账户不存在 |
| fail.password_incorrect | 密码不对   |

### 获得可用角色

GET /api/get-available-roles

响应

```js
{
  status: 'ok',
  data: {
    token: '123',
    toast: 'fail.none_of_available_roles',
    roles: [
      { name: 'SCHOOL', available: true, side: 'SELL' },
      { name: 'FACTORY', available: true, side: 'SELL' },
      { name: 'MALL', available: true, side: 'SELL' },
      { name: 'COMMUNITY', available: true, side: 'SELL' },
      { name: 'PHOTOVOLTAIC', available: true, side: 'BUY' },
      { name: 'WIND', available: true, side: 'BUY' },
      { name: 'BATTERY', available: true, side: 'BUY' },
      { name: 'GAS', available: true, side: 'BUY' }
    ]
  }
}
```

- roles: Array<{ role: string; available: boolean; side: 'SEEL' | 'BUY' }>

| toast                        | 说明           |
| ---------------------------- | -------------- |
| fail.none_of_available_roles | 没有可用的角色 |

### 更新角色

POST /api/update-role

响应

```js
{
  status: 'ok',
  data: {
    token: '123',
    toast: '',
    side: 'SELL',
    role: 'SCHOOL'
  },
}
```

| toast             | 说明                   |
| ----------------- | ---------------------- |
| fail.login_again  | 重新登录               |
| fail.role_in_used | 角色已占用，请重新选择 |
