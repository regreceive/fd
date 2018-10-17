import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import LineChart from '../../../components/LineChart';
import BarChart from '../../../components/Barchart';
import DetailInfo from './DetailInfo';
import './index.css';

export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div styleName="container">
        <LineChart />
        <BarChart />
        <DetailInfo />
      </div>
    );
  }
}
