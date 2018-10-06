import React, { Component, ComponentClass, StatelessComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import { IStoreState } from '../types';

interface IProps {
  component: ComponentClass | StatelessComponent;
  producer?: boolean;
  consumer?: boolean;
  path: string;
}

interface IStateProps extends IProps {
  isLogin: boolean;
  type: -1 | 0 | 1;
}

const mapStateToProps = (state: IStoreState) => ({
  isLogin: !!state.user.token,
  type: state.user.type,
});

@(connect(mapStateToProps) as any)
export default class PrivateRoute extends Component<IProps, {}> {
  get injected() {
    return this.props as IStateProps;
  }

  @autobind
  public middleComponent(props: RouteProps) {
    let pathname = '';
    const { isLogin, type } = this.injected;
    const { component: PageComponent, producer, consumer } = this.props;

    if (!isLogin) {
      pathname = '/login';
    } else if (type === -1) {
      pathname = '/choose-role';
    } else if (type === 1 && producer) {
      pathname = '/consumer';
    } else if (type === 0 && consumer) {
      pathname = '/producer';
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
