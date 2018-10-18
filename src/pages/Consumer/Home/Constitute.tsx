import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Icon, NavBar } from 'antd-mobile';
// import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  priceConstitute: IUser['priceConstitute'];
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  priceConstitute: state.user.priceConstitute,
});

@(connect(mapStateToProps) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & RouteComponentProps;
  }

  public componentDidMount() {
    if (typeof this.injected.location.state !== 'object') {
      this.injected.history.goBack();
      return;
    }
  }

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          当前电价组成
        </NavBar>
      </div>
    );
  }
}
