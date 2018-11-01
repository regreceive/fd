import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Chart, Coord, Geom, Axis, Guide, View } from 'bizcharts';

import { getDashBoardData } from '../../../../actions/userActions';
import { IUser } from '../../../../reducers/userReducer';
import { IStoreState } from '../../../../types';

const { Text } = Guide;
import './style.css';

const data1: Array<{ type: string; value: number }> = [];
for (let i = 0; i < 50; i++) {
  const item = { type: i.toString(), value: 10 };
  data1.push(item);
}

interface IProps {
  data: object[];
}
interface IStateProps {
  dashBoard: IUser['dashBoard'];
}

interface IDispatchToState {
  getDashBoardData: typeof getDashBoardData;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  dashBoard: state.user.dashBoard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDashBoardData: () => dispatch(getDashBoardData()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component<IProps, {}> {
  get injected() {
    return this.props as IStateProps & IDispatchToState & IProps;
  }

  public componentDidMount() {
    this.injected.getDashBoardData();
  }

  public render() {
    const cols = { type: { range: [0, 1] }, value: { sync: true } };
    const { dashBoard } = this.injected;
    return (
      <div styleName="chart">
        <Chart height={300} scale={cols} padding="auto" forceFit>
          <View data={data1}>
            <Coord type="polar" radius={0.8} innerRadius={0.75} />
            <Geom
              type="interval"
              position="type*value"
              color="#F6F6F6"
              size={5}
            />
          </View>
          <View data={data1}>
            <Coord type="polar" radius={0.55} innerRadius={0.95} />
            <Geom
              type="interval"
              position="type*value"
              color="#F6F6F6"
              size={5}
            />
            <Axis name="type" visible={false} />
            <Axis name="value" visible={false} />
          </View>
          <View>
            <Guide>
              <Text
                position={['50%', '50%']}
                content={dashBoard.percent}
                style={{
                  fill: '#F6F6F6',
                  fontSize: 50,
                  textAlign: 'center',
                  textBaseline: 'middle',
                }}
              />
              <Text
                position={['50%', '65%']}
                content={dashBoard.max}
                style={{
                  fill: '#fff',
                  fontSize: 20,
                  textAlign: 'center',
                  textBaseline: 'middle',
                }}
              />
            </Guide>
          </View>
        </Chart>
      </div>
    );
  }
}
