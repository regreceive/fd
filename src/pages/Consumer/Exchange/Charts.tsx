import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import convert from '../../../utils/convert';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import './index.css';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  currentCoast: IUser['currentCoast'];
}

@(withLocalize as any)
export default class DoubleChart extends Component<IProps> {
  get injected() {
    return this.props as IProps & LocalizeContextProps;
  }
  public render() {
    const { currentCoast } = this.props;
    const translate = convert(this.injected.translate);
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
      price: {
        alias: translate('price'),
      },
      actual: {
        alias: translate('actual'),
      },
    };
    // const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
    return (
      <div>
        <Chart
          height={300}
          data={currentCoast.list}
          scale={scale}
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
          <Axis name="price" visible={false} />
          <Axis name="actual" visible={false} />
          <Tooltip />
          <Geom
            type="interval"
            position="index*actual"
            color="#0057FF"
            size={3}
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
