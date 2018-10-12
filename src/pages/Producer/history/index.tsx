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
        <div styleName="history">历史报价</div>

        <div styleName="card">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>用户收益</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>状态</span>
                <br />
                <span styleName="blue">待审核</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>用户收益</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>状态</span>
                <br />
                <span styleName="blue">待审核</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>用户收益</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>状态</span>
                <br />
                <span styleName="lose">审核失败</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>用户收益</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>状态</span>
                <br />
                <span styleName="blue">待审核</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>用户收益</span>
                <br />
                <span>5000</span>
              </li>
              <li>
                <span>状态</span>
                <br />
                <span styleName="blue">待审核</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
      </div>
    );
  }
}
