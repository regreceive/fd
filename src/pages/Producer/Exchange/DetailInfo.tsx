import React, { Component } from 'react';
import './index.css';

export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div styleName="section">
        <div>
          <div>
            <span>截止到当前时刻</span>
            <span> 10度</span>
          </div>
          <div>
            <span>调整前用电花费</span>
            <span> 1540EDF </span>
          </div>
          <div>
            <span>调整后用电花费</span>
            <span> 1200EDF </span>
          </div>
        </div>
      </div>
    );
  }
}
