import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';

interface IProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const scale = {
    time: {
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
      padding={[40, 20, 90, 40]}
    >
      <Legend />
      <Axis name="time" />
      <Axis
        name="pv"
        label={{
          formatter: val => `${val}`,
        }}
      />
      <Axis name="Diffuse" visible={false} />
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
