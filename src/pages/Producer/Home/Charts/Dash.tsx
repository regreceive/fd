import React, { Component } from 'react';
import { Chart, Axis, Coord, Geom, Guide } from 'bizcharts';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getDashBoardData } from '../../../../actions/userActions';
import { IUser } from '../../../../reducers/userReducer';
import { IStoreState } from '../../../../types';

import './style.css';
const { Html, Arc } = Guide;
const cols = {
  value: {
    min: 0,
    max: 1,
    tickInterval: 1,
    nice: false,
  },
};

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
    const { percent } = this.injected.dashBoard;
    return (
      <div styleName="chart">
        <Chart
          height={300}
          data={{ value: percent }}
          scale={cols}
          padding="auto"
          forceFit
        >
          <Coord type="polar" radius={0.6} />
          <Axis
            name="value"
            line={{ strokeOpacity: 0 }}
            label={{ formatter: () => '' }}
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
            <Arc
              start={[0, 0.965]}
              end={[percent, 0.965]}
              style={{
                stroke: 'l(0) 0:#FFBF00 1:#F5222D',
                lineWidth: 25,
              }}
            />
            <Html
              position={['50%', '50%']}
              html={`<div style="width: 300px;text-align: center;font-size: 12px!important;">
              <p style="font-size: 3em;color: rgba(0,0,0,0.85);margin: 0;">
              ${percent * 100}%</p>
              <p style="font-size: 2em; margin: 0">${
                this.injected.dashBoard.max
              }</p>
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
      </div>
    );
  }
}
