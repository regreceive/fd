import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';

import './index.css';

interface IStateProps {
  role: IUser['role'];
}

const mapStateToProps = (state: IStoreState) => ({
  role: state.user.role,
});

@(connect(mapStateToProps) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps;
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName="section">
          <div>
            <h2>当前电价组成</h2>
            <dl>
              <dt>今日用电总量</dt>
              <dd>0 度</dd>
            </dl>
            <dl>
              <dt>当前用电价</dt>
              <dd>1 EDF/度</dd>
            </dl>
            <dl>
              <dt>当前大电网电价</dt>
              <dd>1 EDF/度</dd>
            </dl>
          </div>
        </div>

        <div styleName="section spacer">
          <div>
            <h2 styleName="spacer">我的账单</h2>
            <dl>
              <dt>当前已用电量</dt>
              <dd>0 度</dd>
            </dl>
            <dl>
              <dt>用电花费</dt>
              <dd>1 EDF</dd>
            </dl>
            <dl>
              <dt>已省</dt>
              <dd>1000 EDF</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
