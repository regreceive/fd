// 设置路由
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from '../../history';
import PrivateRoute from '../../pages/PrivateRoute';
import Producer from '../../pages/Producer';
import Consumer from '../../pages/Consumer';
import Role from '../../pages/Role';
import Splash from '../../pages/Splash';
import Login from '../../pages/Login';

import './LayoutView.css';

const basePath = process.env.REACT_APP_BASE_PATH;
const splashEnable = process.env.REACT_APP_SPLASH === 'on';

interface IProps {
  isLogin: boolean;
  type: -1 | 0 | 1;
  replace: (path: string) => void;
}

export default class LayoutView extends React.Component<IProps> {
  // 避免react-localize-redux初始化操作
  public shouldComponentUpdate(nextProps: Readonly<IProps>) {
    return (
      nextProps.type !== this.props.type ||
      nextProps.isLogin !== this.props.isLogin
    );
  }

  // 登录状态失效PrivateRoute负责重定向。type实时变化，以下路由负责重定向。
  public render() {
    const defaultPath = ['/choose-role', '/producer', '/consumer'][
      this.props.type + 1
    ];

    return (
      <div className="full-screen">
        <ConnectedRouter history={history}>
          <Switch>
            {splashEnable && (
              <Route path={basePath + '/splash'} component={Splash} />
            )}

            {!this.props.isLogin && (
              <Route path={basePath + '/login'} component={Login} />
            )}

            {this.props.type < 0 && (
              <PrivateRoute path={basePath + '/choose-role'} component={Role} />
            )}

            {this.props.type === 0 && (
              <PrivateRoute
                path={basePath + '/producer'}
                component={Producer}
              />
            )}

            {this.props.type === 1 && (
              <PrivateRoute
                path={basePath + '/consumer'}
                component={Consumer}
              />
            )}

            <Redirect to={basePath + defaultPath} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}
