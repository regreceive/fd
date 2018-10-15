import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import DataSet from '@antv/data-set';
import { data } from './mock/photovoltaic';

export default class Curved extends React.Component {
  public render() {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['PV', 'Direct', 'Diffuse', 'Temperature'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temp', // value字段
    });
    const scale = {
      time: {
        tickCount: 12, // 定义坐标轴刻度线的条数，默认为 5
      },
    };
    return (
      <div>
        <Chart data={dv} scale={scale} forceFit padding="auto" height={300}>
          <Legend />
          <Axis name="time" />
          <Axis
            name="temp"
            label={{
              formatter: val => `${val}`,
            }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="time*temp"
            size={2}
            color={'city'}
            shape={'smooth'}
          />
        </Chart>
      </div>
    );
  }
}
