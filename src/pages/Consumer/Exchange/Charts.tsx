import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import './index.css';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  currentCoast: IUser['currentCoast'];
}

export default class DoubleChart extends Component<IProps> {
  public render() {
    const { currentCoast } = this.props;
    const grid = {
      lineStyle: {
        stroke: '#E5E5E5',
        lineDash: [4, 4],
        lineWidth: 1,
      },
    };
    const scale = {
      index: {
        ticks: [
          '1:00',
          '4:00',
          '7:00',
          '10:00',
          '13:00',
          '16:00',
          '19:00',
          '22:00',
        ],
        tickCount: 8,
      },
    };
    const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
    return (
      <div>
        <Chart
          height={300}
          data={currentCoast.list}
          scale={scale}
          forceFit
          padding={[40, 40, 50, 40]}
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
          <Tooltip />
          <Geom
            type="interval"
            position="index*actual"
            color={['index', [color1]]}
            tooltip={[
              'index*actual',
              (index, actual) => {
                return {
                  name: 'actual',
                  value: actual,
                };
              },
            ]}
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
