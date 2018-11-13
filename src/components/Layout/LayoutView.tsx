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
import {
  getGameStatus,
  gameStatusReset,
  getGameIndex,
} from '../../actions/userActions';

import './LayoutView.css';
import { Translate } from 'react-localize-redux';

const basePath = process.env.REACT_APP_BASE_PATH;
const splashEnable = process.env.REACT_APP_SPLASH === 'on';

interface IProps {
  isLogin: boolean;
  side: IUser['side'];
  role: IUser['role'];
  lang: IUser['config']['lang'];
  toast: IGlobal['toast'];
  gameStatus: IUser['gameStatus'];
  gameIndex: IUser['gameIndex'];
  clearToast: typeof clearToast;
  getGameStatus: typeof getGameStatus;
  gameStatusReset: typeof gameStatusReset;
  getGameIndex: typeof getGameIndex;
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
  private intervalID = -1;
  private indexIntervalID = -1;

  public componentDidMount() {
    this.props.gameStatusReset();
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(() => {
      this.props.getGameStatus();
    }, 3000);
    this.indexIntervalID = window.setInterval(() => {
      this.props.getGameIndex();
    }, 10000);
    this.props.getGameIndex();
  }

  public componentWillUnmount() {
    window.clearInterval(this.intervalID);
    window.clearInterval(this.indexIntervalID);
  }

  // 避免react-localize-redux初始化操作
  public shouldComponentUpdate(nextProps: Readonly<IProps>) {
    // 全局信息提示
    if (nextProps.toast !== '' || nextProps.toast.length > 0) {
      toast(nextProps.toast);
      this.props.clearToast();
    }

    if (nextProps.gameStatus <= 0) {
      window.clearInterval(this.intervalID);
    }

    if (nextProps.gameStatus !== this.props.gameStatus) {
      if (nextProps.gameStatus === 0) {
        toast('success.game_begin');
      } else if (nextProps.gameStatus < 8) {
        toast('loading.game_status', { num: nextProps.gameStatus });
      }
    }

    return (
      nextProps.side !== this.props.side ||
      nextProps.role !== this.props.role ||
      nextProps.isLogin !== this.props.isLogin ||
      nextProps.gameIndex !== this.props.gameIndex ||
      nextProps.lang !== this.props.lang
    );
  }

  // 登录状态失效PrivateRoute负责重定向。side实时变化，以下路由负责重定向。
  public render() {
    const defaultPath = getDefaultPath(this.props.side);

    return (
      <div className="full-screen">
        <div styleName="game-index">
          <span>
            <Translate id="rounds" />:
          </span>
          {this.props.gameIndex}
        </div>
        <ConnectedRouter history={history}>
          <Switch>
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
