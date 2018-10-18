// 设置路由
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from '../../history';
import PrivateRoute from '../../pages/PrivateRoute';
import Producer from '../../pages/Producer';
import Consumer from '../../pages/Consumer';
import Role from '../../pages/Role';
import Agreement from '../../pages/Agreement';
import Splash from '../../pages/Splash';
import Login from '../../pages/Login';
import HelpCenter from '../../pages/HelpCenter';
import toast from '../../utils/toast';
import { IUser } from '../../reducers/userReducer';
import { IGlobal } from '../../reducers/globalReducer';
import { clearToast } from '../../actions/globalActions';
import './LayoutView.css';
import TimeRefer from '../../pages/Producer/timeRefer';

const basePath = process.env.REACT_APP_BASE_PATH;
const splashEnable = process.env.REACT_APP_SPLASH === 'on';

interface IProps {
  isLogin: boolean;
  side: IUser['side'];
  role: IUser['role'];
  toast: IGlobal['toast'];
  clearToast: typeof clearToast;
}

function getDefaultPath(side: IUser['side']) {
  switch (side) {
    case 'BUY':
      return '/consumer';
    case 'SELL':
      return '/producer';
    default:
      return '/choose-role';
  }
}

export default class LayoutView extends React.Component<IProps> {
  // 避免react-localize-redux初始化操作
  public shouldComponentUpdate(nextProps: Readonly<IProps>) {
    // 全局信息提示
    if (nextProps.toast !== '' || nextProps.toast.length > 0) {
      toast(nextProps.toast);
      this.props.clearToast();
    }

    return (
      nextProps.side !== this.props.side ||
      nextProps.role !== this.props.role ||
      nextProps.isLogin !== this.props.isLogin
    );
  }

  // 登录状态失效PrivateRoute负责重定向。side实时变化，以下路由负责重定向。
  public render() {
    const defaultPath = getDefaultPath(this.props.side);

    return (
      <div className="full-screen">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={basePath + '/b'} component={TimeRefer} />
            {splashEnable && (
              <Route path={basePath + '/splash'} component={Splash} />
            )}

            {!this.props.isLogin && (
              <Route path={basePath + '/login'} component={Login} />
            )}

            {this.props.side === '' && (
              <PrivateRoute path={basePath + '/choose-role'} component={Role} />
            )}

            {this.props.side === '' && (
              <PrivateRoute
                path={basePath + '/agreement'}
                component={Agreement}
              />
            )}

            {this.props.side === 'SELL' && (
              <PrivateRoute
                path={basePath + '/producer'}
                component={Producer}
              />
            )}

            {this.props.side === 'BUY' && (
              <PrivateRoute
                path={basePath + '/consumer'}
                component={Consumer}
              />
            )}
            <Route path={basePath + '/help-center'} component={HelpCenter} />

            <Redirect to={basePath + defaultPath} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}
