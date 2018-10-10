import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { Button } from 'antd-mobile';

import { ILogin, login } from '../../actions/userActions';
import { testEmail } from '../../utils/validator';

import './index.css';
import { IStoreState } from '../../types';

interface IState {
  submitDisabled: boolean;
}

interface IStateProps {
  waiting: boolean;
}

interface IDispatchProps {
  login: (data: ILogin) => void;
}

const mapStateToProps = (state: IStoreState) => ({
  waiting: state.user.status.login === 1,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: ILogin) => dispatch(login(data)),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = { submitDisabled: true };
  public username = React.createRef<HTMLInputElement>();
  public password = React.createRef<HTMLInputElement>();

  get injected() {
    return this.props as IStateProps & IDispatchProps;
  }

  public changeHandle = () => {
    const username = this.username.current as HTMLInputElement;
    const password = this.password.current as HTMLInputElement;
    const submitEnabled = testEmail(username.value) && password.value !== '';
    this.setState({ submitDisabled: !submitEnabled });
  };

  public loginHandle = () => {
    const username = (this.username.current as HTMLInputElement).value;
    const password = (this.password.current as HTMLInputElement).value;
    this.injected.login({ username, password });
  };

  public render() {
    return (
      <div styleName="container">
        <div styleName="logo-container">edf</div>
        <div styleName="form-container">
          <h1>
            <Translate id="hello" />
          </h1>
          <Translate>
            {({ translate }) => (
              <div styleName="input-area">
                <input
                  ref={this.username}
                  type="email"
                  placeholder={translate('login.email.placeholder') as string}
                  onChange={this.changeHandle}
                />
                <input
                  ref={this.password}
                  type="password"
                  placeholder={
                    translate('login.password.placeholder') as string
                  }
                  onChange={this.changeHandle}
                />
              </div>
            )}
          </Translate>
          <Button
            type="ghost"
            disabled={this.state.submitDisabled || this.injected.waiting}
            onClick={this.loginHandle}
          >
            <Translate id="login.button" />
          </Button>
        </div>
      </div>
    );
  }
}
