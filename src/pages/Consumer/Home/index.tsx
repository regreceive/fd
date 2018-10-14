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
        <div styleName="trend">66</div>
        <div styleName="attribute">
          <div styleName="inset">
            <div styleName="fixed"> 当前电价组成 </div>
            <dl>
              <dt>今日用电总量</dt>
              <dd>10度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl>
              <dt>当前用电价</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl>
              <dt>当前大电网电价</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
          </div>
        </div>
        <div styleName="attribute condition">
          <div styleName="inset">
            <div styleName="fixed"> 我的账单 </div>
            <dl>
              <dt>当前已用电量</dt>
              <dd>10度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl>
              <dt>用电花费</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl>
              <dt>已省</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
