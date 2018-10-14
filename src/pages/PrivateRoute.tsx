import React, { Component, ComponentClass, StatelessComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { IStoreState } from '../types';

interface IProps {
  component: ComponentClass | StatelessComponent;
  path: string;
}

interface IStateProps extends IProps {
  isLogin: boolean;
}

const mapStateToProps = (state: IStoreState) => ({
  isLogin: state.global.token.length > 0,
});

@(connect(mapStateToProps) as any)
export default class PrivateRoute extends Component<IProps, {}> {
  get injected() {
    return this.props as IStateProps;
  }

  @autobind
  public middleComponent(props: RouteProps) {
    let pathname = '';
    const { isLogin } = this.injected;
    const { component: PageComponent } = this.props;

    if (!isLogin) {
      pathname = '/login';
    }

    return pathname ? (
      <Redirect
        to={{
          pathname,
          state: { from: props.location },
        }}
      />
    ) : (
      <PageComponent {...props} />
    );
  }

  public render() {
    return <Route path={this.props.path} component={this.middleComponent} />;
  }
}
