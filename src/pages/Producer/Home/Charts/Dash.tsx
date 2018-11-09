import React, { Component } from 'react';
import { Chart, Axis, Coord, Geom, Guide } from 'bizcharts';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
const { Html, Arc } = Guide;
import { getDashBoardData } from '../../../../actions/userActions';
import { IUser } from '../../../../reducers/userReducer';
import { IStoreState } from '../../../../types';

const color = ['#0086FA', '#FFBF00', '#F5222D'];
const cols = {
  value: {
    min: 0,
    max: 10,
    tickInterval: 1,
    nice: false,
  },
};
const data = [{ value: 0.8 }];

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
    const val = data[0].value;
    console.log(data);
    return (
      <Chart
        height={window.innerHeight}
        data={data}
        scale={cols}
        padding={[0, 0, 200, 0]}
        forceFit
      >
        <Coord type="polar" radius={0.6} />
        <Axis
          name="value"
          line={{ strokeOpacity: 0 }}
          tickLine={{
            length: -24,
            stroke: 'rgba(0, 0, 0, 0.09)',
            strokeOpacity: 0,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            start={[0, 0.965]}
            end={[10, 0.965]}
            style={{
              // 底灰色
              stroke: 'rgba(0, 0, 0, 0.09)',
              lineWidth: 25,
            }}
          />
          {val >= 3 && (
            <Arc
              start={[0, 0.965]}
              end={[val, 0.965]}
              style={{
                // 底灰色
                stroke: color[0],
                lineWidth: 25,
              }}
            />
          )}
          {val >= 6 && (
            <Arc
              start={[2, 0.965]}
              end={[4, 0.965]}
              style={{
                // 底灰色
                stroke: color[1],
                lineWidth: 25,
              }}
            />
          )}
          {val >= 6 &&
            val < 10 && (
              <Arc
                start={[4, 0.965]}
                end={[val, 0.965]}
                style={{
                  // 底灰色
                  stroke: color[2],
                  lineWidth: 25,
                }}
              />
            )}
          {val >= 3 &&
            val < 6 && (
              <Arc
                start={[2, 0.965]}
                end={[val, 0.965]}
                style={{
                  // 底灰色
                  stroke: color[1],
                  lineWidth: 25,
                }}
              />
            )}
          {val < 3 && (
            <Arc
              start={[0, 0.965]}
              end={[val, 0.965]}
              style={{
                // 底灰色
                stroke: color[0],
                lineWidth: 25,
              }}
            />
          )}
          <Html
            position={['50%', '50%']}
            html={`<div style="width: 300px;text-align: center;font-size: 12px!important;">
              <p style="font-size: 1.75em; color: rgba(0,0,0,0.43);margin: 0;">合格率</p>
              <p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">
              ${val * 10}%</p>
              </div>`}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color="#1890FF"
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}
