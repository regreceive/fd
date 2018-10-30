import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import { timeSegment } from '../../utils/timeFormat';

interface IProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const scale = {
    time: {
      ticks: timeSegment(new Date().getHours()),
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
      <Axis name="Direct" visible={false} />
      <Axis name="Diffuse" visible={false} />
      <Axis name="Temperature" visible={false} />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
      />
      <Geom type="line" position="time*Output" color="#ff0000" shape="smooth" />
      <Geom
        type="line"
        position="time*Direct"
        shape="smooth"
        color="#c1aeaa"
        style={{
          lineDash: [4, 4],
        }}
      />
      <Geom
        type="line"
        position="time*Diffuse"
        shape="smooth"
        style={{
          lineDash: [4, 4],
        }}
      />
      <Geom
        type="line"
        position="time*Temperature"
        shape="smooth"
        color="#e0e066"
        style={{
          lineDash: [4, 4],
        }}
      />
    </Chart>
  );
};

export default Curved;
