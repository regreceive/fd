import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class LineChart extends Component {
  public render() {
    const data = [
      {
        month: '2015-01-01',
        acc: 84.0,
      },
      {
        month: '2015-02-01',
        acc: 14.9,
      },
      {
        month: '2015-03-01',
        acc: 17.0,
      },
      {
        month: '2015-04-01',
        acc: 20.2,
      },
      {
        month: '2015-05-01',
        acc: 55.6,
      },
      {
        month: '2015-06-01',
        acc: 56.7,
      },
      {
        month: '2015-07-01',
        acc: 30.6,
      },
      {
        month: '2015-08-01',
        acc: 63.2,
      },
      {
        month: '2015-09-01',
        acc: 24.6,
      },
      {
        month: '2015-10-01',
        acc: 14.0,
      },
      {
        month: '2015-11-01',
        acc: 9.4,
      },
      {
        month: '2015-12-01',
        acc: 6.3,
      },
    ];
    const cols = {
      month: {
        alias: '月份',
      },
      acc: {
        alias: '积累量',
      },
    };
    const grid = {
      lineStyle: {
        stroke: '#E5E5E5',
        lineDash: [4, 4],
        lineWidth: 1,
      },
    };
    return (
      <div>
        <h2>电价</h2>
        <Chart height={300} data={data} scale={cols} forceFit padding="auto">
          <Axis
            name="month"
            tickLine="null"
            line={{
              stroke: '#E5E5E5',
              lineDash: [4, 4],
              lineWidth: 1,
            }}
            grid={grid}
          />
          <Axis
            name="acc"
            line={{
              stroke: '#E5E5E5',
              lineDash: [4, 4],
              lineWidth: 1,
            }}
          />
          <Tooltip />
          <Geom
            type="line"
            position="month*acc"
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
