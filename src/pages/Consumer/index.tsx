import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

import TabBarView from './TabBarView';

const basePath = process.env.REACT_APP_BASE_PATH;

export default class extends Component {
  public render() {
    return (
      <Switch>
        <Route exact path={basePath + '/consumer'} component={TabBarView} />
        <Redirect to="/consumer" />
      </Switch>
    );
  }
}
