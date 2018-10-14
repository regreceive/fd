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

响应消息体

```ts
interface IResponseSchema {
  status: string;
  token?: string;
  toast: string;
  data: {};
}
```

- token 登录身份，用于之后受保护的数据交互，会话失效返回空字符串
- toast 客户端显示的提示信息，无消息返回空字符串：

### 登录

POST /api/login

```js
request = { username: 'aaa@sina.com', password: '111' };
```

- username 用户名
- password 密码

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: 'success.login',
  data: { username: 'aaa@s.com', role: '', side: '' },
};
```

- username 回传用户名
- role 角色
- side 角色性质

| toast                   | 说明       |
| ----------------------- | ---------- |
| success.login           | 登录成功   |
| fail.account_not_found  | 账户不存在 |
| fail.password_incorrect | 密码不对   |

### 获得可用角色

GET /api/get-available-roles

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: '',
  data: {
    roles: [
      { role: 'SCHOOL', available: false, side: 'BUY' },
      { role: 'FACTORY', available: true, side: 'BUY' },
      { role: 'MALL', available: true, side: 'BUY' },
      { role: 'COMMUNITY', available: true, side: 'BUY' },
      { role: 'PHOTOVOLTAIC', available: true, side: 'SELL' },
      { role: 'WIND', available: true, side: 'SELL' },
      { role: 'BATTERY', available: true, side: 'SELL' },
      { role: 'GAS', available: true, side: 'SELL' },
    ],
  },
};
```

roles

- role 角色名称
- available 是否可用
- side 发/用电

| toast                        | 说明           |
| ---------------------------- | -------------- |
| fail.none_of_available_roles | 没有可用的角色 |

### 选择角色

POST /api/update-role

```js
request = { role: 'community' };
```

- role 角色名称

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: '',
  data: { side: 'SELL', role: 'SCHOOL' },
};
```

- role 角色名称
- side 发/用电

| toast             | 说明                   |
| ----------------- | ---------------------- |
| fail.login_again  | 重新登录               |
| fail.role_in_used | 角色已占用，请重新选择 |

### 发电用户当前状态

GET /api/get-current-state

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: '',
  data: { currentState: { power: 10, cost: 0.36, efficiency: 1 } },
};
```

currentState

- power 发电量
- cost 成本
- efficiency 效率

| toast | 说明 |
| ----- | ---- |


### 发电用户收益

GET /api/get-earns

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: '',
  data: { earns: { vol: 12, price: 0.31, amount: 12500 } },
};
```

earns

- vol 售卖
- price 电价
- amount 总费用

| toast | 说明 |
| ----- | ---- |


### 发电用户报价信息

GET /api/get-offer

响应

```js
response = {
  status: 'ok',
  token: '123',
  toast: '',
  data: { offer: { price: 0.23, timestamp: 1539526393793 } },
};
```

offer

- price 实时电价
- timestamp 上次报价时间戳

| toast | 说明 |
| ----- | ---- |


### 发电用户上传报价

POST /api/get-offer

```js
request = { power: 12, price: 1.21 };
```

- power 发电量
- price 电价

响应

```js
response = { status: 'ok', token: '123', toast: 'success.offer' };
```

| toast | 说明 |
| ----- | ---- |

