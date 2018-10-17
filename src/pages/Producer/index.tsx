import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

import TabBarView from './TabBarView';
import Quote from './Quote';
import Detail from './Detail';

const basePath = process.env.REACT_APP_BASE_PATH;

export default class extends Component {
  public render() {
    return (
      <Switch>
        <Route exact path={basePath + '/producer'} component={TabBarView} />
        <Route path={basePath + '/producer/quote'} component={Quote} />
        <Route path={basePath + '/producer/detail'} component={Detail} />
        <Redirect to="/producer" />
      </Switch>
    );
  }
}
