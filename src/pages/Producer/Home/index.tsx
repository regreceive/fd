import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

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

const data = [
  {
    month: '2015-01-01',
    acc: 84.0,
  },
  {
    month: '2015-02-01',
    acc: 14.9,
  },
  {
    month: '2015-03-01',
    acc: 17.0,
  },
  {
    month: '2015-04-01',
    acc: 20.2,
  },
  {
    month: '2015-05-01',
    acc: 55.6,
  },
  {
    month: '2015-06-01',
    acc: 56.7,
  },
  {
    month: '2015-07-01',
    acc: 30.6,
  },
  {
    month: '2015-08-01',
    acc: 63.2,
  },
  {
    month: '2015-09-01',
    acc: 24.6,
  },
  {
    month: '2015-10-01',
    acc: 14.0,
  },
  {
    month: '2015-11-01',
    acc: 9.4,
  },
  {
    month: '2015-12-01',
    acc: 6.3,
  },
];

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }

  public componentDidMount() {
    this.injected.getProducerSummary();
  }

  public render() {
    const { role, currentState, earns } = this.injected;
    return (
      <div styleName="container">
        <Chart height={400} data={data} forceFit>
          <Axis name="month" />
          <Axis name="temperature" label={{ formatter: val => `${val}°C` }} />
          <Tooltip crosshairs={{ type: 'y' }} />
          <Geom
            type="line"
            position="month*temperature"
            size={2}
            color={'city'}
          />
          <Geom
            type="point"
            position="month*temperature"
            size={4}
            color={'city'}
          />
        </Chart>
        <CurrentState role={role} data={currentState} />
        <Earns role={role} data={earns} />
        <Offer />
      </div>
    );
  }
}
