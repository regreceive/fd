import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { getElectricEXChart } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';

import DoubleChart from './Charts';
import './index.css';

interface IStateProps {
  exChart: IUser['exChart'];
}

interface IDispatchProps {
  getElectricEXChart: typeof getElectricEXChart;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  exChart: state.user.exChart,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getElectricEXChart: () => dispatch(getElectricEXChart()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps;
  }

  public componentDidMount() {
    this.injected.getElectricEXChart();
  }

  public render() {
    const { exChart } = this.injected;
    return (
      <div styleName="container">
        <DoubleChart exChart={exChart} />
      </div>
    );
  }
}
