import React, { Component } from 'react';
import { LocalizeContextProps, Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Button, Icon, NavBar } from 'antd-mobile';
import { goBack, push } from 'connected-react-router';
import { Dispatch } from 'redux';
import { IStoreState } from '../../types';
import { getType, IUser } from '../../reducers/userReducer';
import { updateRole } from '../../actions/userActions';

import './index.css';

interface IState {
  agreement: string;
}
interface IStateProps {
  role: IUser['role'];
  lang: IUser['config']['lang'];
}
interface IDispatchProps {
  push: (path: string) => void;
  goBack: () => void;
  updateRole: (role: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  push: (path: string) => dispatch(push(path)),
  goBack: () => dispatch(goBack()),
  updateRole: (role: number) => dispatch(updateRole({ role })),
});

const mapStateToProps = (state: IStoreState) => ({
  role: state.user.role,
  lang: state.user.config.lang,
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
    return this.props as LocalizeContextProps & IStateProps & IDispatchProps;
  }

  public componentDidMount() {
    const lang = this.injected.lang;
    const type = getType(this.injected.role);
    const key = ['producer', 'consumer'][type];

    getAgreement(lang).then(data => {
      this.setState({ agreement: data[key] });
    });
  }

  public clickHandle = () => {
    this.injected.updateRole(this.injected.role);
  };

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.goBack}
        >
          <Translate id="login.agreement" />
        </NavBar>
        <div styleName="wrapper">
          <div
            styleName="agreement"
            dangerouslySetInnerHTML={{ __html: this.state.agreement }}
          />
          <Button type="primary" onClick={this.clickHandle}>
            <Translate id="login.agree" />
          </Button>
        </div>
      </div>
    );
  }
}
