import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import { getCurrentCoast, postTime } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { List, DatePicker, InputItem } from 'antd-mobile';
import DoubleChart from './Charts';
import DetailInfo from './DetailInfo';
import './index.css';

interface IStateProps {
  currentCoast: IUser['currentCoast'];
}

interface IState {
  isShow: boolean;
  begin: Date;
  after: Date;
}

interface IDispatchProps {
  getCurrentCoast: typeof getCurrentCoast;
  postTime: typeof postTime;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  currentCoast: state.user.currentCoast,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCurrentCoast: () => dispatch(getCurrentCoast()),
  postTime: (fromTndex: number, toIndex: number, adjustElectric: number) =>
    dispatch(postTime(fromTndex, toIndex, adjustElectric)),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  public constructor(props: object) {
    super(props);
    const date = new Date();
    date.setHours(date.getHours() + 1);
    this.state = {
      begin: date,
      isShow: false,
      after: new Date(),
    };
  }
  get injected() {
    return this.props as IStateProps & IDispatchProps & IState;
  }

  public componentDidMount() {
    this.injected.getCurrentCoast();
  }

  public changeTime = (date: Date) => {
    console.log(date);
    this.setState({
      begin: date,
    });
  };

  public changeTime2 = (date: Date) => {
    console.log(date);
    this.setState({
      after: date,
    });
  };
  public changePower = (value: string) => {
    console.log(value);
  };

  public edit = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  public render() {
    const { isShow } = this.state;
    const { currentCoast } = this.injected;
    return (
      <div styleName="container">
        <div styleName="title">
          <h2>电力模拟</h2>
          <p onClick={this.edit}>{isShow ? '保存' : '编辑'}</p>
        </div>
        <DoubleChart currentCoast={currentCoast} />
        {isShow === true ? (
          <div>
            <List>
              <DatePicker
                mode="time"
                value={this.state.begin}
                onChange={this.changeTime}
                maxDate={this.state.after}
              >
                <List.Item arrow="horizontal">开始时间</List.Item>
              </DatePicker>
              <InputItem extra="度" onChange={this.changePower} />
              <DatePicker
                mode="time"
                value={this.state.after}
                onChange={this.changeTime2}
                minDate={this.state.begin}
              >
                <List.Item arrow="horizontal">结束时间</List.Item>
              </DatePicker>
            </List>
          </div>
        ) : (
          ''
        )}
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }

  // private clickHandlePost = () => {
  //   this.injected.postTime(this.fromTndex, this.toIndex, this.adjustElectric);
  // };
}
