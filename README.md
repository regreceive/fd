法国电力移动端

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
{"status":"ok","data":{"token":"123","username":"aaa@sina.com","role":1,"toast":"success.login"}}
```

- token 登录身份，用于之后受保护的数据交互
- username 回传用户名
- role (0 初始状态。>0 各种角色，1 ～ 4 发电用户，4 ～ 8 用电用户。)
- toast 客户端显示的提示信息，可以是空字符串，也可以是以下几种：

| 码                      | 说明       |
| ----------------------- | ---------- |
| success.login           | 登录成功   |
| fail.account_not_found  | 账户不存在 |
| fail.password_incorrect | 密码不对   |
