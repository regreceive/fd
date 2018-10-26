import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import Photovoltaic from './pv';
import Wind from './Wind';
import Gas from './Gas';
import Battery from './Battery';
import './index.css';
import { RouteComponentProps } from 'react-router';
interface IStateProps {
  role: IUser['role'];
}
const mapStateMapProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
});
@(connect(mapStateMapProps) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & RouteComponentProps;
  }
  public render() {
    const role = this.injected.role;
    const goBack = this.injected.history.goBack;
    return (
      <React.Fragment>
        {role === 'PHOTOVOLTAIC' && (
          <Photovoltaic role={this.injected.role} goBack={goBack} />
        )}
        {role === 'WIND' && <Wind role={this.injected.role} goBack={goBack} />}
        {role === 'GAS' && <Gas role={this.injected.role} goBack={goBack} />}
        {role === 'BATTERY' && (
          <Battery role={this.injected.role} goBack={goBack} />
        )}
      </React.Fragment>
    );
  }
}
