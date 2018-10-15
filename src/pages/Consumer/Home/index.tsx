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
            <div>
              <span>今日用电总量</span>
              <span>0 度</span>
            </div>
            <div>
              <span>当前用电价</span>
              <span>1 EDF/度</span>
            </div>
            <div>
              <span>当前大电网电价</span>
              <span>1 EDF/度</span>
            </div>
          </div>
        </div>

        <div styleName="section">
          <div>
            <h2>我的账单</h2>
            <div>
              <span>当前已用电量</span>
              <span>0 度</span>
            </div>
            <div>
              <span>用电花费</span>
              <span>1 EDF</span>
            </div>
            <div>
              <span>已省</span>
              <span>1000 EDF</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
