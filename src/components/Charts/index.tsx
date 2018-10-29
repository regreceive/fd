import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';

interface IProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const scale = {
    time: {
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
      tickCount: 8, // 定义坐标轴刻度线的条数，默认为 5
    },
  };
  const bg = {
    fill: '#fff',
  };
  return (
    <Chart
      data={props.data}
      scale={scale}
      forceFit
      height={300}
      background={bg}
      padding={[40, 40, 90, 40]}
    >
      <Legend />
      <Axis name="time" />
      <Axis
        name="pv"
        label={{
          formatter: val => `${val}`,
        }}
      />
      <Axis name="Diffuse" />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom
        type="line"
        position="time*PV"
        size={2}
        color={'city'}
        shape={'smooth'}
        style={{
          lineDash: [4, 4],
        }}
      />
      <Geom type="line" position="time*Diffuse" size={2} shape={'smooth'} />
    </Chart>
  );
};

export default Curved;
