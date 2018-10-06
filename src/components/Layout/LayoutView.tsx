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
  type: -1 | 0 | 1;
}

export default class LayoutView extends React.Component<IProps> {
  public shouldComponentUpdate() {
    return false;
  }

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
            <Route path={basePath + '/login'} component={Login} />
            <Route path={basePath + '/choose-role'} component={Role} />
            <PrivateRoute
              producer
              path={basePath + '/producer'}
              component={Producer}
            />
            <PrivateRoute
              consumer
              path={basePath + '/consumer'}
              component={Consumer}
            />
            <Redirect to={basePath + defaultPath} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}
