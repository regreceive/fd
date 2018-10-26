import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';

import { getChartsData } from '../../data';
import Curved from '../../../components/Charts';
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
    const data = getChartsData(role);
    return (
      <div styleName="container">
        <div styleName="title">
          <Translate id={'role.' + role.toLocaleLowerCase()} />
        </div>
        <Curved data={data} />
        <CurrentState role={role} data={currentState} />
        <Earns role={role} data={earns} />
        <Offer />
      </div>
    );
  }
}
