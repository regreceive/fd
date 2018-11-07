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
      price: {
        alias: translate('price'),
      },
      eletric: {
        alias: translate('eletric'),
      },
    };
    const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
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
            <Axis name="index" />
            <Axis name="price" visible={false} />
            <Axis name="eletric" visible={false} />
            <Tooltip />
            <Geom
              type="interval"
              position="index*eletric"
              color={['index', [color1]]}
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
      </div>
    );
  }
}
