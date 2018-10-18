import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Button, Icon, NavBar } from 'antd-mobile';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

import { IStoreState } from '../../types';
import { IUser } from '../../reducers/userReducer';
import { IRole, updateRole } from '../../actions/userActions';

import './index.css';

interface IState {
  agreement: string;
}
interface IStateProps {
  lang: IUser['config']['lang'];
  waiting: boolean;
}
interface IDispatchProps {
  updateRole: typeof updateRole;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateRole: (role: IRole) => dispatch(updateRole(role)),
});

const mapStateToProps = (state: IStoreState) => ({
  lang: state.user.config.lang,
  waiting: state.ui.freeze.role === 1,
});

function getAgreement(code: string): Promise<{}> {
  return import('./' + code + '.json');
}

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = { agreement: '' };

  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    if (typeof this.injected.location.state !== 'object') {
      this.injected.history.goBack();
      return;
    }

    const lang = this.injected.lang;
    const side = this.injected.location.state.side;

    getAgreement(lang).then(data => {
      this.setState({ agreement: data[side] });
    });
  }

  public clickHandle = () => {
    this.injected.updateRole({
      role: (this.injected.location.state.role as string).toUpperCase(),
    });
  };

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="login.agreement" />
        </NavBar>
        <div styleName="wrapper">
          <div
            styleName="agreement"
            dangerouslySetInnerHTML={{ __html: this.state.agreement }}
          />
          <Button
            type="primary"
            onClick={this.clickHandle}
            disabled={this.injected.waiting}
          >
            <Translate id="login.agree" />
          </Button>
        </div>
      </div>
    );
  }
}
