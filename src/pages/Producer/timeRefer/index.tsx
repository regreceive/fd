import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import './index.css';
interface IState {
  timeValue: any;
  timeValue1: any;
  spanShow: boolean;
  spanShow2: boolean;
}
export default class extends Component<{}, IState> {
  public state = {
    timeValue: '',
    timeValue1: '',
    spanShow: false,
    spanShow2: false,
  };
  // public shouldComponentUpdate() {
  //     return false;
  // }

  public clickHandle = (role: string) => () => {
    console.log(this.state.timeValue);

    this.setState({ timeValue: role });
  };
  public clickHandle1 = (role: string) => () => {
    console.log(this.state.timeValue);

    this.setState({ timeValue1: role });
  };
  public clickDisable = () => {
    if (this.state.spanShow2) {
      this.setState({ spanShow: false });
    } else {
      this.setState({ spanShow: !this.state.spanShow });
    }
  };
  public clickDisable1 = () => {
    if (this.state.spanShow) {
      this.setState({ spanShow2: false });
    } else {
      this.setState({ spanShow2: !this.state.spanShow2 });
    }
  };
  public render() {
    return (
      <div styleName="container">
        <div styleName="history">我的账单</div>
        <div styleName="timeRefer">
          按时间查询
          <span onClick={this.clickDisable}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.timeValue}
            {!this.state.spanShow2 &&
              this.state.spanShow && (
                <ul>
                  <li onClick={this.clickHandle('08:00:00')}>08:00:00</li>
                  <li onClick={this.clickHandle('09:00:00')}>09:00:00</li>
                  <li onClick={this.clickHandle('10:00:00')}>10:00:00</li>
                  <li onClick={this.clickHandle('11:00:00')}>11:00:00</li>
                  <li onClick={this.clickHandle('12:00:00')}>12:00:00</li>
                  <li onClick={this.clickHandle('13:00:00')}>13:00:00</li>
                  <li onClick={this.clickHandle('14:00:00')}>14:00:00</li>
                  <li onClick={this.clickHandle('15:00:00')}>15:00:00</li>
                  <li onClick={this.clickHandle('16:00:00')}>16:00:00</li>
                  <li onClick={this.clickHandle('17:00:00')}>17:00:00</li>
                  <li onClick={this.clickHandle('18:00:00')}>18:00:00</li>
                  <li onClick={this.clickHandle('19:00:00')}>19:00:00</li>
                  <li onClick={this.clickHandle('20:00:00')}>20:00:00</li>
                  <li onClick={this.clickHandle('21:00:00')}>21:00:00</li>
                  <li onClick={this.clickHandle('22:00:00')}>22:00:00</li>
                  <li onClick={this.clickHandle('23:00:00')}>23:00:00</li>
                  <li onClick={this.clickHandle('24:00:00')}>24:00:00</li>
                  <li onClick={this.clickHandle('01:00:00')}>01:00:00</li>
                  <li onClick={this.clickHandle('02:00:00')}>02:00:00</li>
                  <li onClick={this.clickHandle('03:00:00')}>03:00:00</li>
                  <li onClick={this.clickHandle('04:00:00')}>04:00:00</li>
                  <li onClick={this.clickHandle('05:00:00')}>05:00:00</li>
                  <li onClick={this.clickHandle('06:00:00')}>06:00:00</li>
                  <li onClick={this.clickHandle('07:00:00')}>07:00:00</li>
                </ul>
              )}
          </span>
          —{' '}
          <span onClick={this.clickDisable1}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.timeValue1}
            {this.state.spanShow2 &&
              !this.state.spanShow && (
                <ul>
                  <li onClick={this.clickHandle1('08:00:00')}>08:00:00</li>
                  <li onClick={this.clickHandle1('09:00:00')}>09:00:00</li>
                  <li onClick={this.clickHandle1('10:00:00')}>10:00:00</li>
                  <li onClick={this.clickHandle1('11:00:00')}>11:00:00</li>
                  <li onClick={this.clickHandle1('12:00:00')}>12:00:00</li>
                  <li onClick={this.clickHandle1('13:00:00')}>13:00:00</li>
                  <li onClick={this.clickHandle1('14:00:00')}>14:00:00</li>
                  <li onClick={this.clickHandle1('15:00:00')}>15:00:00</li>
                  <li onClick={this.clickHandle1('16:00:00')}>16:00:00</li>
                  <li onClick={this.clickHandle1('17:00:00')}>17:00:00</li>
                  <li onClick={this.clickHandle1('18:00:00')}>18:00:00</li>
                  <li onClick={this.clickHandle1('19:00:00')}>19:00:00</li>
                  <li onClick={this.clickHandle1('20:00:00')}>20:00:00</li>
                  <li onClick={this.clickHandle1('21:00:00')}>21:00:00</li>
                  <li onClick={this.clickHandle1('22:00:00')}>22:00:00</li>
                  <li onClick={this.clickHandle1('23:00:00')}>23:00:00</li>
                  <li onClick={this.clickHandle1('24:00:00')}>24:00:00</li>
                  <li onClick={this.clickHandle1('01:00:00')}>01:00:00</li>
                  <li onClick={this.clickHandle1('02:00:00')}>02:00:00</li>
                  <li onClick={this.clickHandle1('03:00:00')}>03:00:00</li>
                  <li onClick={this.clickHandle1('04:00:00')}>04:00:00</li>
                  <li onClick={this.clickHandle1('05:00:00')}>05:00:00</li>
                  <li onClick={this.clickHandle1('06:00:00')}>06:00:00</li>
                  <li onClick={this.clickHandle1('07:00:00')}>07:00:00</li>
                </ul>
              )}
          </span>
        </div>
        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>0.23</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>0.23</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>0.23</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>50000</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>0.23</span>
              </li>
            </ul>
          </div>
          <p>发电时间 2018-09-09 12:1</p>
        </div>
      </div>
    );
  }
}
