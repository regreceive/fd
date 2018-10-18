import React, { Component } from 'react';
import { Chart, Geom, Axis } from 'bizcharts';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  getChartData: IUser['getChartData'];
}
export default class DoubleChart extends Component<IProps> {
  public render() {
    const { getChartData } = this.props;
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
    const scale = {
      creatime: {
        ticks: [
          '0:00',
          '2:00',
          '4:00',
          '6:00',
          '8:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
        ],
        tickCount: 12, // 定义坐标轴刻度线的条数，默认为 5
      },
    };
    const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
    // const color2 = 'l (270) 0:#FF9131 1:#FE5816';
    return (
      <div>
        <h2>电价</h2>
        <Chart
          height={300}
          data={getChartData}
          scale={scale}
          forceFit
          padding="auto"
        >
          <Axis
            name="creatime"
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
          <Axis name="electric" />
          {/* <Tooltip /> */}
          <Geom
            type="line"
            position="creatime*price"
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
          <Geom
            type="interval"
            position="creatime*electric"
            color={['creatime', [color1]]}
            size={5}
          />
        </Chart>
      </div>
    );
  }
}
