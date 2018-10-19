import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import { getCurrentCoast } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { Link } from 'react-router-dom';
import LineChart from '../../../components/LineChart';
import BarChart from '../../../components/Barchart';
import DetailInfo from './DetailInfo';
import './index.css';

interface IStateProps {
  currentCoast: IUser['currentCoast'];
}

interface IDispatchProps {
  getCurrentCoast: typeof getCurrentCoast;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  currentCoast: state.user.currentCoast,
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
    const { currentCoast } = this.injected;
    return (
      <div styleName="container">
        <div styleName="history">
          <h2>电力交易</h2>
          <span>
            <Link to="/producer/exchangeFrom">报表</Link>
          </span>
        </div>
        <LineChart />
        <BarChart />
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }
}
