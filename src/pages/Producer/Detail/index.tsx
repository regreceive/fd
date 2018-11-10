import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { getGameTime } from '../../../actions/userActions';
import Photovoltaic from './pv';
import Wind from './Wind';
import Gas from './Gas';
import Battery from './Battery';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  gameTime: IUser['gameIndex'];
}

interface IDispatchProps {
  getGameTime: typeof getGameTime;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  gameTime: state.user.gameTime,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getGameTime: () => dispatch(getGameTime()),
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
    this.injected.getGameTime();
  }

  public render() {
    const { role, gameTime } = this.injected;
    const goBack = this.injected.history.goBack;
    return (
      <React.Fragment>
        {role === 'PHOTOVOLTAIC' && (
          <Photovoltaic
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameTime}
          />
        )}
        {role === 'WIND' && (
          <Wind
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameTime}
          />
        )}
        {role === 'GAS' && (
          <Gas role={this.injected.role} goBack={goBack} gameIndex={gameTime} />
        )}
        {role === 'BATTERY' && (
          <Battery
            role={this.injected.role}
            goBack={goBack}
            gameIndex={gameTime}
          />
        )}
      </React.Fragment>
    );
  }
}
