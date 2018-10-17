import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionSheet, Button } from 'antd-mobile';
import { Path } from 'history';
import { push, RouterAction } from 'connected-react-router';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import { logout, getWalletBalance } from '../../actions/userActions';

import './index.css';

const basePath = process.env.REACT_APP_BASE_PATH;

interface IStateProps {
  balance: IUser['wallet']['balance'];
  waiting: boolean;
}

interface IDispatchToState {
  logout: typeof logout;
  push: (path: Path) => RouterAction;
  getWalletBalance: typeof getWalletBalance;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  balance: state.user.wallet.balance,
  waiting: state.ui.freeze.logout === 1,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  logout: () => dispatch(logout()),
  push: (path: Path) => dispatch(push(path)),
  getWalletBalance: () => dispatch(getWalletBalance()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }

  public componentDidMount() {
    this.injected.getWalletBalance();
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
            <dl>
              <dt>EDF电力钱包</dt>
              <dd>{this.injected.balance} EDF</dd>
            </dl>
            <dl onClick={this.helpHandle}>
              <dt>帮助中心</dt>
            </dl>
            <dl>
              <dt>语言设置</dt>
            </dl>
          </div>
          <div styleName="button">
            <Button
              type="primary"
              onClick={this.actionSheet}
              disabled={this.injected.waiting}
            >
              退出登录
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private helpHandle = () => {
    this.injected.push(basePath + '/help-center');
  };

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
