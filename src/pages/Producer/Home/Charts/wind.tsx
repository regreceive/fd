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
      ].slice(0, Math.floor((new Date().getHours() + 1) / 3)),
      tickCount: 8,
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
      padding={[40, 20, 90, 20]}
    >
      <Legend />
      <Axis name="time" />
      <Axis name="Output" visible={false} />
      <Axis name="Speed" visible={false} />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom type="line" position="time*Output" color="#ff0000" shape="smooth" />
      <Geom
        type="line"
        position="time*Speed"
        shape="smooth"
        color="#c1aeaa"
        style={{
          lineDash: [4, 4],
        }}
      />
    </Chart>
  );
};

export default Curved;
