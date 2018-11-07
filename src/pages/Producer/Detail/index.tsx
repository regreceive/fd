import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { getGameIndex } from '../../../actions/userActions';
import Photovoltaic from './pv';
import Wind from './Wind';
import Gas from './Gas';
import Battery from './Battery';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  gameIndex: IUser['gameIndex'];
}

interface IDispatchProps {
  getGameIndex: typeof getGameIndex;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  gameIndex: state.user.gameIndex,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getGameIndex: () => dispatch(getGameIndex()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentWillMount() {
    this.injected.getGameIndex();
  }

  public render() {
    const { role, gameIndex } = this.injected;
    const goBack = this.injected.history.goBack;
    return (
      <React.Fragment>
        {role === 'PHOTOVOLTAIC' && (
          <Photovoltaic
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameIndex}
          />
        )}
        {role === 'WIND' && (
          <Wind
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameIndex}
          />
        )}
        {role === 'GAS' && (
          <Gas
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameIndex}
          />
        )}
        {role === 'BATTERY' && (
          <Battery
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameIndex}
          />
        )}
      </React.Fragment>
    );
  }
}
