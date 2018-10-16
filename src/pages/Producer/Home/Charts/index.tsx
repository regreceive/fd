import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
// import DataSet from '@antv/data-set';
import { data } from './mock/photovoltaic';

export default class Curved extends React.Component {
  public render() {
    // const ds = new DataSet();
    // const dv = ds.createView().source(data);
    // dv.transform({
    //   type: 'fold',
    //   fields: ['PV', 'Direct', 'Diffuse', 'Temperature'],
    //   // 展开字段集
    //   key: 'city',
    //   // key字段
    //   value: 'temp', // value字段
    // });
    const scale = {
      time: {
        ticks: [
          '8:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '0:00',
          '2:00',
          '4:00',
          '6:00',
        ],
        tickCount: 12, // 定义坐标轴刻度线的条数，默认为 5
      },
    };
    const bg = {
      fill: '#fff',
    };
    return (
      <div>
        <Chart
          data={data}
          scale={scale}
          forceFit
          height={300}
          background={bg}
          padding="auto"
        >
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
            position="time*PV"
            size={2}
            shape={'smooth'}
            style={{
              lineDash: [4, 4],
            }}
          />
          <Geom type="line" position="time*Diffuse" size={2} shape={'smooth'} />
        </Chart>
      </div>
    );
  }
}
