import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Translate } from 'react-localize-redux';
import { Icon, NavBar } from 'antd-mobile';

import { getCheck } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { dateTimeFormat, segmentTime } from '../../../utils/timeFormat';

import './index.css';

interface IStateProps {
  checkDetail: IUser['checkDetail'];
}

interface IDispatchProps {
  getCheck: typeof getCheck;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  checkDetail: state.user.checkDetail,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCheck: () => dispatch(getCheck()),
});

function dateTimeScope() {
  const from = new Date(Date.now() - 60 * 60 * 24 * 1000);
  from.setHours(5, 0, 0, 0);
  const to = new Date();
  to.setMinutes(0, 0);
  return dateTimeFormat(from.getTime()) + '-' + dateTimeFormat(to.getTime());
}

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    this.injected.getCheck();
  }

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="check" />
        </NavBar>

        <div styleName="overview">
          <div styleName="row">
            <div styleName="column">
              <span>用电量/KW</span>
              <span>{this.injected.checkDetail.total.eletric}</span>
            </div>
            <div styleName="column">
              <span>总费用/EDF</span>
              <span>{this.injected.checkDetail.total.price}</span>
            </div>
          </div>
          <p>用电时间段 {dateTimeScope()}</p>
        </div>

        <div styleName="detail">
          <h2>账单详情</h2>
          <div styleName="header">
            <span>用电量/KW</span> <span>总费用/EDF</span>{' '}
            <span styleName="fixed">用电时间段</span>
          </div>
          {this.injected.checkDetail.list.map(item => (
            <div styleName="list" key={item.uid}>
              <span>{item.eletric}</span>
              <span>{item.price}</span>
              <span styleName="fixed">{segmentTime(item.index)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
