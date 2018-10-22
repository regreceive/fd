import React, { Component } from 'react';
import { Chart, Geom, Axis } from 'bizcharts';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  currentCoast: IUser['currentCoast'];
}
export default class DoubleChart extends Component<IProps> {
  public render() {
    const { currentCoast } = this.props;
    // const cols = {
    //   month: {
    //     alias: '月份',
    //   },
    //   acc: {
    //     alias: '积累量',
    //   },
    // };
    const grid = {
      lineStyle: {
        stroke: '#E5E5E5',
        lineDash: [4, 4],
        lineWidth: 1,
      },
    };
    // const scale = {
    //   index: {
    //     ticks: [
    //       '0:00',
    //       '2:00',
    //       '4:00',
    //       '6:00',
    //       '8:00',
    //       '10:00',
    //       '12:00',
    //       '14:00',
    //       '16:00',
    //       '18:00',
    //       '20:00',
    //       '22:00',
    //     ],
    //     tickCount: 2, // 定义坐标轴刻度线的条数，默认为 5
    //   },
    // };
    const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
    // const color2 = 'l (270) 0:#FF9131 1:#FE5816';
    return (
      <div>
        <h2>电价/用电量</h2>
        <Chart
          height={300}
          data={currentCoast.list}
          // scale={scale}
          forceFit
          padding="auto"
        >
          <Axis
            name="index"
            tickLine="null"
            line={{
              stroke: '#E5E5E5',
              lineDash: [4, 4],
              lineWidth: 1,
            }}
            grid={grid}
          />
          <Axis
            name="price"
            line={{
              stroke: '#E5E5E5',
              lineDash: [4, 4],
              lineWidth: 1,
            }}
          />
          <Axis name="actual" />
          {/* <Tooltip /> */}
          <Geom
            type="interval"
            position="index*actual"
            color={['index', [color1]]}
            size={5}
          />
          <Geom
            type="line"
            position="index*price"
            size={3}
            color="#FE5816"
            shape="smooth"
            style={{
              shadowColor: 'lightgray',
              shadowBlur: 5,
              shadowOffsetX: 0,
              shadowOffsetY: 3,
            }}
          />
        </Chart>
      </div>
    );
  }
}
