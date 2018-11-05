import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  LocalizeContextProps,
  SingleLanguageTranslation,
  Translate,
  withLocalize,
} from 'react-localize-redux';
import { ActionSheet, Button, Picker, List } from 'antd-mobile';
import { Path } from 'history';
import { push, RouterAction } from 'connected-react-router';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import {
  logout,
  getWalletBalance,
  changeLanguage,
} from '../../actions/userActions';
import { getLanguage } from '../Layout';
import avatar from './assets/avatar.png';

import s from './index.css';

// const basePath = process.env.REACT_APP_BASE_PATH;

interface IStateProps {
  balance: IUser['wallet']['balance'];
  username: IUser['username'];
  lang: IUser['config']['lang'];
  waiting: boolean;
}

interface IDispatchToState {
  logout: typeof logout;
  push: (path: Path) => RouterAction;
  getWalletBalance: typeof getWalletBalance;
  changeLanguage: typeof changeLanguage;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  balance: state.user.wallet.balance,
  username: state.user.username,
  waiting: state.ui.freeze.logout === 1,
  lang: state.user.config.lang,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  logout: () => dispatch(logout()),
  push: (path: Path) => dispatch(push(path)),
  getWalletBalance: () => dispatch(getWalletBalance()),
  changeLanguage: (lang: string) => dispatch(changeLanguage(lang)),
});

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as LocalizeContextProps & IStateProps & IDispatchToState;
  }

  public componentDidMount() {
    this.injected.getWalletBalance();
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
              extra={this.injected.translate('select') as string}
              data={[
                { label: 'English', value: 'en' },
                { label: '中文', value: 'cn' },
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

  private langHandle = (lang: string[]) => {
    getLanguage(lang[0]).then((data: SingleLanguageTranslation) => {
      this.injected.addTranslationForLanguage(data, lang[0]);
      this.injected.setActiveLanguage(lang[0]);
    });
    this.injected.changeLanguage(lang[0]);
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
        options: [
          this.injected.translate('exit') as string,
          this.injected.translate('cancel') as string,
        ],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
        message: this.injected.translate('mine.exitConfirm'),
      },
      (buttonIndex: number) => {
        if (buttonIndex === 0) {
          this.exitHandle();
        }
      },
    );
  };
}
