import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import convert from '../../../utils/convert';
import {
  LocalizeContextProps,
  withLocalize,
  Translate,
} from 'react-localize-redux';

import { IUser } from 'src/reducers/userReducer';

import './index.css';
interface IProps {
  exChart: IUser['exChart'];
}

@(withLocalize as any)
export default class DoubleChart extends Component<IProps> {
  get injected() {
    return this.props as IProps & LocalizeContextProps;
  }
  public render() {
    const { exChart } = this.props;
    const translate = convert(this.injected.translate);
    const scale = {
      // index: {
      //   ticks: [
      //     '1:00',
      //     '4:00',
      //     '7:00',
      //     '10:00',
      //     '13:00',
      //     '16:00',
      //     '19:00',
      //     '22:00',
      //   ],
      //   tickCount: 8,
      // },
      price: {
        alias: translate('price'),
      },
      eletric: {
        alias: translate('eletric'),
      },
    };

    return (
      <div>
        <h2>
          <Translate id="producer.exchange.chart" />
        </h2>
        <div styleName="chart">
          <Chart
            height={300}
            data={exChart}
            scale={scale}
            forceFit
            padding="auto"
          >
            <Axis
              name="index"
              grid={{
                lineStyle: {
                  stroke: '#E5E5E5',
                  lineDash: [4, 4],
                  lineWidth: 1,
                },
                hideFirstLine: true,
                hideLastLine: true,
              }}
            />
            <Axis name="price" visible={false} />
            <Axis name="eletric" visible={false} />
            <Axis name="past" visible={false} />
            <Tooltip />
            <Geom type="area" position="index*past" tooltip={false} />
            <Geom
              type="interval"
              position="index*eletric"
              color={'#00bdff'}
              size={15}
              tooltip={[
                'index*eletric',
                (index, eletric) => {
                  return {
                    name: translate('eletric'),
                    value: eletric,
                  };
                },
              ]}
              style={{
                stroke: '#4d91e9',
                lineWidth: 1,
              }}
            />
            <Geom
              type="line"
              position="index*price"
              size={2}
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
              type="point"
              position="index*price"
              size={2}
              color="#FE5816"
            />
          </Chart>
        </div>
      </div>
    );
  }
}
