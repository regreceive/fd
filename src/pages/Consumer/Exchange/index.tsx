import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import {
  getCurrentCoast,
  getAdjust,
  postTime,
} from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { Button, InputItem } from 'antd-mobile';
import DoubleChart from './Charts';
import DetailInfo from './DetailInfo';
import './index.css';

interface IStateProps {
  currentCoast: IUser['currentCoast'];
  adjust: IUser['adjust'];
}

interface IState {
  fromTndex: any;

  toIndex: any;

  spanShow: boolean;

  spanShow2: boolean;
}
interface IDispatchProps {
  getCurrentCoast: typeof getCurrentCoast;
  getAdjust: typeof getAdjust;
  postTime: typeof postTime;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  currentCoast: state.user.currentCoast,
  adjust: state.user.adjust,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCurrentCoast: () => dispatch(getCurrentCoast()),
  getAdjust: () => dispatch(getAdjust()),
  postTime: (fromTndex: number, toIndex: number, adjustElectric: number) =>
    dispatch(postTime(fromTndex, toIndex, adjustElectric)),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  public state = {
    fromTndex: '',

    toIndex: '',

    spanShow: false,

    spanShow2: false,
  };
  private fromTndex = 0;
  private toIndex = 0;
  private adjustElectric = 0;

  get injected() {
    return this.props as IStateProps & IDispatchProps & IState;
  }

  public componentDidMount() {
    this.injected.getCurrentCoast();
    this.injected.getAdjust();
  }

  public clickHandle = (role: string) => () => {
    console.log(this.state.fromTndex);

    this.setState({ fromTndex: role });
    this.fromTndex = Number(this.state.fromTndex);
    console.log(this.fromTndex);
  };

  public clickHandle1 = (role: string) => () => {
    console.log(this.state.toIndex);

    this.setState({ toIndex: role });
    this.toIndex = Number(this.state.toIndex);
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
    const { currentCoast } = this.injected;
    return (
      <div styleName="container">
        <DoubleChart currentCoast={currentCoast} />
        <div styleName="timeRefer">
          <span onClick={this.clickDisable}>
            {this.state.fromTndex}
            {!this.state.spanShow2 &&
              this.state.spanShow && (
                <ul>
                  <li onClick={this.clickHandle('08:00')}>08:00</li>

                  <li onClick={this.clickHandle('09:00')}>09:00</li>

                  <li onClick={this.clickHandle('10:00')}>10:00</li>

                  <li onClick={this.clickHandle('11:00')}>11:00</li>

                  <li onClick={this.clickHandle('12:00')}>12:00</li>

                  <li onClick={this.clickHandle('13:00')}>13:00</li>

                  <li onClick={this.clickHandle('14:00')}>14:00</li>

                  <li onClick={this.clickHandle('15:00')}>15:00</li>

                  <li onClick={this.clickHandle('16:00')}>16:00</li>

                  <li onClick={this.clickHandle('17:00')}>17:00</li>

                  <li onClick={this.clickHandle('18:00')}>18:00</li>

                  <li onClick={this.clickHandle('19:00')}>19:00</li>

                  <li onClick={this.clickHandle('20:00')}>20:00</li>

                  <li onClick={this.clickHandle('21:00')}>21:00</li>

                  <li onClick={this.clickHandle('22:00')}>22:00</li>

                  <li onClick={this.clickHandle('23:00')}>23:00</li>

                  <li onClick={this.clickHandle('24:00')}>24:00</li>

                  <li onClick={this.clickHandle('01:00')}>01:00</li>

                  <li onClick={this.clickHandle('02:00')}>02:00</li>

                  <li onClick={this.clickHandle('03:00')}>03:00</li>

                  <li onClick={this.clickHandle('04:00')}>04:00</li>

                  <li onClick={this.clickHandle('05:00')}>05:00</li>

                  <li onClick={this.clickHandle('06:00')}>06:00</li>

                  <li onClick={this.clickHandle('07:00')}>07:00</li>
                </ul>
              )}
          </span>
          <span onClick={this.clickDisable1}>
            {this.state.toIndex}
            {this.state.spanShow2 &&
              !this.state.spanShow && (
                <ul>
                  <li onClick={this.clickHandle1('8')}>08:00</li>

                  <li onClick={this.clickHandle1('9')}>09:00</li>

                  <li onClick={this.clickHandle1('10')}>10:00</li>

                  <li onClick={this.clickHandle1('11')}>11:00</li>

                  <li onClick={this.clickHandle1('12')}>12:00</li>

                  <li onClick={this.clickHandle1('13')}>13:00</li>

                  <li onClick={this.clickHandle1('14')}>14:00</li>

                  <li onClick={this.clickHandle1('15')}>15:00</li>

                  <li onClick={this.clickHandle1('16')}>16:00</li>

                  <li onClick={this.clickHandle1('17')}>17:00</li>

                  <li onClick={this.clickHandle1('18')}>18:00</li>

                  <li onClick={this.clickHandle1('19')}>19:00</li>

                  <li onClick={this.clickHandle1('20')}>20:00</li>

                  <li onClick={this.clickHandle1('21')}>21:00</li>

                  <li onClick={this.clickHandle1('22')}>22:00</li>

                  <li onClick={this.clickHandle1('23')}>23:00</li>

                  <li onClick={this.clickHandle1('0')}>24:00</li>

                  <li onClick={this.clickHandle1('1')}>01:00</li>

                  <li onClick={this.clickHandle1('2')}>02:00</li>

                  <li onClick={this.clickHandle1('3')}>03:00</li>

                  <li onClick={this.clickHandle1('4')}>04:00</li>

                  <li onClick={this.clickHandle1('5')}>05:00</li>

                  <li onClick={this.clickHandle('6')}>06:00</li>

                  <li onClick={this.clickHandle1('7')}>07:00</li>
                </ul>
              )}
          </span>
        </div>
        <InputItem extra="度" type="digit" onChange={this.adjustChangeHandle} />
        <Button
          type="ghost"
          // className={css.button}
          // disabled={waiting}
          onClick={this.clickHandlePost}
        >
          确定
        </Button>
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }

  private clickHandlePost = () => {
    this.injected.postTime(this.adjustElectric, this.fromTndex, this.toIndex);
  };
  private adjustChangeHandle = (value: string) => {
    this.adjustElectric = Number(value);
  };
}
