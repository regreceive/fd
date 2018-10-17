import React, { Component } from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Modal } from 'antd-mobile';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { getAvailableRoles } from '../../actions/userActions';
import { IUser } from '../../reducers/userReducer';
import { IStoreState } from '../../types';
import Brand from './Brand';

import './index.css';

interface IState {
  role: string;
  side: string;
}

interface IStateProps {
  roles: IUser['roles'];
}

interface IDispatchProps {
  getAvailableRoles: typeof getAvailableRoles;
}

const basePath = process.env.REACT_APP_BASE_PATH;

const mapStateToProps = (state: IStoreState) => ({
  roles: state.user.roles,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAvailableRoles: () => dispatch(getAvailableRoles()),
});

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public state = {
    role: '',
    side: '',
  };

  get injected() {
    return this.props as IStateProps &
      IDispatchProps &
      RouteComponentProps &
      LocalizeContextProps;
  }

  public componentWillMount() {
    this.injected.getAvailableRoles();
  }

  public clickHandle = (role: string, side: string) => () => {
    this.setState({ role, side });
    const translate = this.injected.translate;
    const desc = translate('modal.role.' + role);
    Modal.alert(translate('modal.role.title'), desc, [
      {
        text: translate('modal.button.cancel') as string,
      },
      {
        text: translate('modal.button.ok') as string,
        onPress: this.pressHandle,
      },
    ]);
  };

  public pressHandle = () => {
    this.injected.history.push(basePath + '/agreement', this.state);
  };

  public render() {
    console.log(this.injected.roles);
    return (
      <div styleName="container">
        {this.injected.roles.map(({ role, side, available }) => {
          role = role.toLocaleLowerCase();
          return available ? (
            <Brand
              key={role}
              id={role}
              selected={role === this.state.role}
              onClick={this.clickHandle(role, side)}
            />
          ) : null;
        })}
      </div>
    );
  }
}
