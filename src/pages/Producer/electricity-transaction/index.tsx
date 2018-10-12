import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import './index.css';
export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName=" trend">66</div>
        <div styleName="attribute">
          <div styleName="attribute-inset">
            <div styleName="fixed"> 当前电价组成 </div>
            <dl styleName="attribute-dl">
              <dt>今日用电总量</dt>
              <dd>10度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl styleName="attribute-dl ycc ">
              <dt>当前用电价</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl styleName="attribute-dl ycc ">
              <dt>当前大电网电价</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
          </div>
        </div>
        <div styleName="attribute condition">
          <div styleName="attribute-inset">
            <div styleName="fixed"> 我的账单 </div>
            <dl styleName="attribute-dl">
              <dt>当前已用电量</dt>
              <dd>10度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl styleName="attribute-dl ycc ">
              <dt>用电花费</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
            <div styleName="line">&nbsp;</div>
            <dl styleName="attribute-dl ycc ">
              <dt>已省</dt>
              <dd>0.25 EDF/度</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
