import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { asyncComponent } from 'react-async-component';

import { getChartsData } from '../../data';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { getProducerSummary } from '../../../actions/userActions';
import CurrentState from './CurrentState';
import Earns from './Earns';
import Offer from './Offer';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  currentState: IUser['currentState'];
  earns: IUser['earns'];
}

interface IDispatchToState {
  getProducerSummary: typeof getProducerSummary;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  currentState: state.user.currentState,
  earns: state.user.earns,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducerSummary: () => dispatch(getProducerSummary()),
});

interface IAsync {
  data: object[];
}

const asyncChart = (role: string) =>
  asyncComponent<IAsync>({
    resolve: () => {
      switch (role) {
        case 'PHOTOVOLTAIC':
          return import('./Charts/pv');
        case 'WIND':
          return import('./Charts/wind');
        case 'GAS':
          return import('./Charts/cchp');
        case 'BATTERY':
          return import('./Charts/DashBoard');
        default:
          return import('./Charts/pv');
      }
    },
  });

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  private chart: React.ComponentType<IAsync>;

  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }

  public componentWillMount() {
    this.chart = asyncChart(this.injected.role);
  }

  public componentDidMount() {
    this.injected.getProducerSummary();
  }

  public render() {
    const AsyncChart = this.chart;
    const { role, currentState, earns } = this.injected;
    const data = getChartsData(role);
    return (
      <div styleName="container">
        <div styleName="title">
          <Translate id={'role.' + role.toLocaleLowerCase()} />
        </div>
        <AsyncChart data={data} />
        <CurrentState role={role} data={currentState} />
        <Earns role={role} data={earns} />
        <Offer />
      </div>
    );
  }
}
