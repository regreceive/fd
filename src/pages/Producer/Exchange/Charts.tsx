import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { Translate } from 'react-localize-redux';

import { IUser } from 'src/reducers/userReducer';

interface IProps {
  exChart: IUser['exChart'];
}

export default class DoubleChart extends Component<IProps> {
  public render() {
    const { exChart } = this.props;

    // const grid = {
    //   lineStyle: {
    //     stroke: '#E5E5E5',
    //     lineDash: [4, 4],
    //     lineWidth: 1,
    //   },
    // };
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
        <h2>
          <Translate id="producer.exchange.chart" />
        </h2>
        <Chart
          height={300}
          data={exChart}
          scale={scale}
          forceFit
          padding="auto"
        >
          <Axis name="index" />
          <Axis name="price" visible={false} />
          <Axis name="eletric" visible={false} />
          <Tooltip />
          <Geom
            type="interval"
            position="index*eletric"
            color={['index', [color1]]}
            tooltip={[
              'index*eletric',
              (index, eletric) => {
                return { name: 'electric', value: eletric };
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
