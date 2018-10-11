import React, { Component } from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { chooseRole } from '../../actions/userActions';
import { IUser } from '../../reducers/userReducer';
import Brand from './Brand';

import './index.css';

interface IState {
  role: IUser['role'];
}

interface IDispatchProps {
  chooseRole: typeof chooseRole;
}

const basePath = process.env.REACT_APP_BASE_PATH;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  chooseRole: (role: string) => dispatch(chooseRole(role)),
});

@(withLocalize as any)
@(connect(
  null,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = {
    role: '',
  };

  get injected() {
    return this.props as IDispatchProps &
      RouteComponentProps &
      LocalizeContextProps;
  }

  public clickHandle = () => {
    const translate = this.injected.translate;
    const desc = translate('modal.role.' + this.state.role);
    Modal.alert(translate('modal.role.title'), desc, [
      {
        text: 'Cancel',
      },
      {
        text: 'Ok',
        onPress: this.pressHandle,
      },
    ]);
  };

  public pressHandle = () => {
    this.injected.chooseRole('WIND');
    this.injected.history.push(basePath + '/agreement', { side: 'SELL' });
  };

  public render() {
    return (
      <div styleName="container">
        <Brand />
      </div>
    );
  }
}
