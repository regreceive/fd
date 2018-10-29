import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { ActionSheet, Button, Picker, List } from 'antd-mobile';
import { Path } from 'history';
import { push, RouterAction } from 'connected-react-router';

import translate from '../../utils/translate';
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
  private asyncLang = { exit: '', cancel: '', exitConfirm: '' };

  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }

  public componentDidMount() {
    this.injected.getWalletBalance();
  }

  public componentWillMount() {
    this.asyncLang = {
      exit: translate('exit'),
      cancel: translate('cancel'),
      exitConfirm: translate('mine.exitConfirm'),
    };
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName="banner">
          <div styleName="title">
            <Translate id="personal" />
          </div>
          <div styleName="wrapper">
            <div styleName="user">
              <p>{this.injected.username}</p>
              <p>
                <span>
                  <Translate id="mine.userId" />
                </span>
                12346756
              </p>
            </div>
            <img src={avatar} styleName="avatar" />
          </div>
        </div>

        <div styleName="flex">
          <List>
            <List.Item extra={this.injected.balance + ' EDF'}>
              <Translate id="mine.wallet" />
            </List.Item>
            {/*<List.Item onClick={this.helpHandle} arrow="horizontal">*/}
            {/*<Translate id="mine.help" />*/}
            {/*</List.Item>*/}
            <Picker
              cols={1}
              extra={translate('select')}
              data={[
                { label: 'English', value: 'en' },
                { label: 'Chinese', value: 'cn' },
              ]}
              onOk={this.langHandle}
            >
              <List.Item arrow="horizontal">
                <Translate id="mine.language" />
              </List.Item>
            </Picker>
          </List>

          <Button
            type="primary"
            onClick={this.actionSheet}
            disabled={this.injected.waiting}
            className={s.button}
          >
            <Translate id="mine.exit" />
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
        options: [this.asyncLang.exit, this.asyncLang.cancel],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        message: this.asyncLang.exitConfirm,
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          this.exitHandle();
        }
      },
    );
  };
}
