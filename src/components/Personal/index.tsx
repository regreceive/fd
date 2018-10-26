import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ActionSheet, Button, Picker, List } from 'antd-mobile';
import { Path } from 'history';
import { push, RouterAction } from 'connected-react-router';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import { logout, getWalletBalance } from '../../actions/userActions';
import avatar from './assets/tian.jpg';

import s from './index.css';

// const basePath = process.env.REACT_APP_BASE_PATH;

interface IStateProps {
  balance: IUser['wallet']['balance'];
  username: IUser['username'];
  waiting: boolean;
}

interface IDispatchToState {
  logout: typeof logout;
  push: (path: Path) => RouterAction;
  getWalletBalance: typeof getWalletBalance;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  balance: state.user.wallet.balance,
  username: state.user.username,
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
            <div>我的</div>
            <p>{this.injected.username}</p>
            <p>
              <span>用户ID</span>
              12346756
            </p>
          </div>
          <img src={avatar} styleName="avatar" />
        </div>

        <div styleName="flex">
          <List>
            <List.Item extra={this.injected.balance + ' EDF'}>
              EDF电力钱包
            </List.Item>
            {/*<List.Item onClick={this.helpHandle} arrow="horizontal">*/}
            {/*帮助中心*/}
            {/*</List.Item>*/}
            <Picker
              cols={1}
              extra="请选择"
              data={[
                { label: 'English', value: 'en' },
                { label: 'Chinese', value: 'cn' },
              ]}
              onOk={this.langHandle}
            >
              <List.Item arrow="horizontal">语言设置</List.Item>
            </Picker>
          </List>

          <Button
            type="primary"
            onClick={this.actionSheet}
            disabled={this.injected.waiting}
            className={s.button}
          >
            退出登录
          </Button>
        </div>
      </div>
    );
  }

  private langHandle = (val: string) => {
    console.log(val);
  };

  // private helpHandle = () => {
  //   this.injected.push(basePath + '/help-center');
  // };

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
