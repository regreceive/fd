import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  LocalizeContextProps,
  withLocalize,
  Translate,
} from 'react-localize-redux';
import { List, Picker, InputItem, NavBar, Button } from 'antd-mobile';
import {
  getCurrentCoast,
  getGameIndex,
  postTime,
} from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import DoubleChart from './Charts';
import DetailInfo from './DetailInfo';

import './index.css';

interface IState {
  isEdit: boolean;
  scope: Array<{ label: string; value: number }>;
  from: number;
  to: number;
}

interface IStateProps {
  currentCoast: IUser['currentCoast'];
  gameIndex: IUser['gameIndex'];
}

interface IDispatchProps {
  getCurrentCoast: typeof getCurrentCoast;
  postTime: typeof postTime;
  getGameIndex: typeof getGameIndex;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  currentCoast: state.user.currentCoast,
  gameIndex: state.user.gameIndex,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCurrentCoast: () => dispatch(getCurrentCoast()),
  postTime: (fromIndex: number, toIndex: number, adjustElectric: number) =>
    dispatch(postTime(fromIndex, toIndex, adjustElectric)),
  getGameIndex: () => dispatch(getGameIndex()),
});

const scope = [
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  { label: '11', value: 11 },
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
  { label: '17', value: 17 },
  { label: '18', value: 18 },
  { label: '19', value: 19 },
  { label: '20', value: 20 },
  { label: '21', value: 21 },
  { label: '22', value: 22 },
  { label: '23', value: 23 },
  { label: '0', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<{}, IState> {
  get injected() {
    return this.props as IStateProps &
      IDispatchProps &
      IState &
      LocalizeContextProps;
  }

  public state = {
    scope,
    from: 0,
    to: 0,
    isEdit: false,
  };

  private power = 0;

  public componentDidMount() {
    this.injected.getCurrentCoast();
    this.injected.getGameIndex();
  }

  public componentWillReceiveProps(nextProps: IStateProps) {
    let slicedScope = scope.slice(nextProps.gameIndex);
    slicedScope =
      slicedScope.length > 0 ? slicedScope : [{ label: '0', value: 0 }];

    this.setState({
      from: slicedScope[0].value,
      to: slicedScope[0].value,
      scope: slicedScope,
    });
  }

  public edit = () => {
    // this.setState({
    //   isEdit: !this.state.isEdit,
    // });

    // if (this.state.isEdit) {
    const { from, to } = this.state;
    this.injected.postTime(from, to, this.power);
    // }
  };

  public cancel = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  public render() {
    // const { isEdit } = this.state;
    const { currentCoast } = this.injected;

    return (
      <div styleName="container">
        <NavBar
          mode="light"
          // leftContent={
          //   <p onClick={this.cancel}>
          //     {isEdit === true && this.injected.translate('cancel')}
          //   </p>
          // }
          // rightContent={
          //   <p onClick={this.edit}>
          //     {isEdit
          //       ? this.injected.translate('save')
          //       : this.injected.translate('edit')}
          //   </p>
          // }
        >
          <Translate id="consumer.exchange.title" />
        </NavBar>
        <DoubleChart currentCoast={currentCoast} />
        <h2>
          <Translate id="consumer.exchange.adjust" />
        </h2>
        <List>
          <Picker
            data={this.state.scope}
            onOk={this.fromChangeHandle}
            cols={1}
            value={[this.state.from]}
          >
            <List.Item arrow="horizontal">
              <Translate id="consumer.exchange.from" />
            </List.Item>
          </Picker>

          <Picker
            data={this.state.scope}
            onOk={this.toChangeHandle}
            cols={1}
            value={[this.state.to]}
          >
            <List.Item arrow="horizontal">
              <Translate id="consumer.exchange.to" />
            </List.Item>
          </Picker>

          <InputItem
            extra={this.injected.translate('degree')}
            onChange={this.changePower}
            type="digit"
            placeholder={
              this.injected.translate('consumer.exchange.placeholder') as string
            }
          />
        </List>
        <Button type="primary" onClick={this.edit}>
          <Translate id="adjust" />
        </Button>
        <DetailInfo currentCoast={currentCoast} />
      </div>
    );
  }

  private fromChangeHandle = (from: number[]) => {
    this.setState({ from: from[0] });
  };

  private toChangeHandle = (to: number) => {
    this.setState({ to: to[0] });
  };

  private changePower = (value: string) => {
    this.power = Number(value);
  };
}
