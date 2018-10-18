import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import './index.css';
import ReactSVG from 'react-svg';
import trendIcon from './trend.svg';
export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName="history">
          {' '}
          电力交易
          <ReactSVG src={trendIcon} />
        </div>

        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>66</span>
              </li>
            </ul>
          </div>
          <p>用电时间段 2018-09-09 12:00:00-12:59:59 </p>
        </div>
      </div>
    );
  }
}
