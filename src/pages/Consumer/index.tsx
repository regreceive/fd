import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

import { basePath } from '../../services/constants';
import TabBarView from './TabBarView';
import Constitute from './Home/Constitute';
import Check from './check';
import QuotedPrice from './QuotedPrice';

export default class extends Component {
  public render() {
    return (
      <Switch>
        <Route exact path={basePath + '/consumer'} component={TabBarView} />
        <Route path={basePath + '/consumer/check'} component={Check} />
        <Route
          path={basePath + '/consumer/quoted-price'}
          component={QuotedPrice}
        />
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
