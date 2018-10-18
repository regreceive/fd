import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import { getCurrentCoast } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';

import DoubleChart from './Charts';
import DetailInfo from './DetailInfo';
import './index.css';

interface IStateProps {
  currentCoast: IUser['currentCoast'];
  getChartData: IUser['getChartData'];
}

interface IDispatchProps {
  getCurrentCoast: typeof getCurrentCoast;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  currentCoast: state.user.currentCoast,
  getChartData: state.user.getChartData,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCurrentCoast: () => dispatch(getCurrentCoast()),
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
    this.injected.getCurrentCoast();
  }
  public render() {
    const { currentCoast, getChartData } = this.injected;
    return (
      <div styleName="container">
        <DoubleChart getChartData={getChartData} />
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }
}
