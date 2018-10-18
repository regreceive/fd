import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

import { basePath } from '../../services/constants';
import TabBarView from './TabBarView';
import Constitute from './Home/Constitute';

export default class extends Component {
  public render() {
    return (
      <Switch>
        <Route exact path={basePath + '/consumer'} component={TabBarView} />
        <Route
          exact
          path={basePath + '/consumer/constitute'}
          component={Constitute}
        />
        <Redirect to="/consumer" />
      </Switch>
    );
  }
}
