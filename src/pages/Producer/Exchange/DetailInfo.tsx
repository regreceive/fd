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
          <dl>
            <dt>截止到当前时刻</dt>
            <dd> 10度</dd>
          </dl>
          <dl>
            <dt>调整前用电花费</dt>
            <dd> 1540EDF </dd>
          </dl>
          <dl>
            <dt>调整后用电花费</dt>
            <dd> 1200EDF </dd>
          </dl>
        </div>
      </div>
    );
  }
}
