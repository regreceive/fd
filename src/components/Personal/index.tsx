import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionSheet, Button } from 'antd-mobile';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import { logout } from '../../actions/userActions';

import './index.css';

interface IStateProps {
  wallet: IUser['wallet']['balance'];
  waiting: boolean;
}

interface IDispatchToState {
  logout: typeof logout;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  wallet: state.user.wallet.balance,
  waiting: state.freeze.logout === 1,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  logout: () => dispatch(logout()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName="banner">
          <div styleName="user">
            <p>188293044</p>
            <p>
              <span>用户ID</span>
              12346756
            </p>
          </div>
          <div styleName="avatar" />
        </div>
        <div styleName="section">
          <div>
            <div>
              <span>EDF电力钱包</span>
              <span>0 EDF</span>
            </div>
            <div>
              <span>帮助中心</span>
            </div>
            <div>
              <span>语言设置</span>
            </div>
          </div>
          <Button
            type="primary"
            onClick={this.actionSheet}
            disabled={this.injected.waiting}
          >
            退出登录
          </Button>
        </div>
      </div>
    );
  }

  private exitHandle = () => {
    this.injected.logout();
  };

  private actionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['退出', '取消'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        message: '确定要退出吗？',
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          this.exitHandle();
        }
      },
    );
  };
}
