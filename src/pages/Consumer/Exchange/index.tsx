import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  LocalizeContextProps,
  withLocalize,
  Translate,
} from 'react-localize-redux';
import { List, DatePicker, InputItem, NavBar } from 'antd-mobile';
import { getCurrentCoast, postTime } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import DoubleChart from './Charts';
import DetailInfo from './DetailInfo';

import './index.css';

interface IState {
  isEdit: boolean;
  begin: Date;
  to: Date;
}

interface IStateProps {
  currentCoast: IUser['currentCoast'];
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
  postTime: (fromIndex: number, toIndex: number, adjustElectric: number) =>
    dispatch(postTime(fromIndex, toIndex, adjustElectric)),
});

const dateMax = new Date(new Date().setHours(23, 0, 0, 0));

function calculateTo(begin: Date) {
  const date = new Date();
  date.setHours(Math.min(23, begin.getHours() + 1), 0, 0, 0);
  return date;
}

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  private power = 0;

  public constructor(props: object) {
    super(props);

    const begin = new Date();
    begin.setHours(begin.getHours() + 1, 0, 0, 0);
    const to = calculateTo(begin);

    this.state = {
      begin,
      to,
      isEdit: false,
    };
  }
  get injected() {
    return this.props as IStateProps &
      IDispatchProps &
      IState &
      LocalizeContextProps;
  }

  public componentDidMount() {
    this.injected.getCurrentCoast();
  }

  public fromTimeChangeHandle = (date: Date) => {
    this.setState({
      begin: date,
      to: calculateTo(date),
    });
  };

  public toTimeChangeHandle = (date: Date) => {
    this.setState({
      to: date,
    });
  };

  public changePower = (value: string) => {
    this.power = Number(value);
  };

  public edit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });

    if (this.state.isEdit) {
      this.injected.postTime(
        this.state.begin.getHours(),
        this.state.to.getHours(),
        this.power,
      );
    }
  };
  public cancel = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };
  public render() {
    const { isEdit } = this.state;
    const { currentCoast } = this.injected;

    const fromDateMin = new Date(
      new Date().setHours(new Date().getHours() + 1, 0, 0, 0),
    );
    const toDateMin = calculateTo(this.state.begin);

    return (
      <div styleName="container">
        <NavBar
          mode="light"
          leftContent={
            <p onClick={this.cancel}>
              {isEdit === true && this.injected.translate('cancel')}
            </p>
          }
          rightContent={
            <p onClick={this.edit}>
              {isEdit
                ? this.injected.translate('save')
                : this.injected.translate('edit')}
            </p>
          }
        >
          <Translate id="consumer.exchange.title" />
        </NavBar>
        <DoubleChart currentCoast={currentCoast} />
        {isEdit === true && (
          <List>
            <DatePicker
              mode="time"
              value={this.state.begin}
              onChange={this.fromTimeChangeHandle}
              minDate={fromDateMin}
              maxDate={dateMax}
            >
              <List.Item arrow="horizontal">
                <Translate id="consumer.exchange.from" />
              </List.Item>
            </DatePicker>
            <InputItem extra="度" onChange={this.changePower} />
            <DatePicker
              mode="time"
              value={this.state.to}
              onChange={this.toTimeChangeHandle}
              minDate={toDateMin}
              maxDate={dateMax}
            >
              <List.Item arrow="horizontal">
                <Translate id="consumer.exchange.to" />
              </List.Item>
            </DatePicker>
          </List>
        )}
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }
}
