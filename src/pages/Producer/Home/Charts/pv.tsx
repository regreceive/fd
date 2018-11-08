import React from 'react';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import convert from '../../../../utils/convert';

interface IProps extends LocalizeContextProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const translate = convert(props.translate);
  const scale = {
    time: {
      ticks: [
        '7:00',
        '10:00',
        '13:00',
        '16:00',
        '19:00',
        '22:00',
        '1:00',
        '4:00',
      ],
      tickCount: 8,
    },
    Output: {
      alias: translate('Output'),
    },
    Direct: {
      alias: translate('Direct'),
    },
    Diffuse: {
      alias: translate('Diffuse'),
    },
    Temperature: {
      alias: translate('Temperature'),
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
      <Legend itemFormatter={translate} />
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
      <Geom
        type="line"
        position="time*Output"
        color="#ff0000"
        shape="smooth"
        style={{
          shadowColor: 'lightgray',
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
        }}
      />
      <Geom
        type="line"
        position="time*Direct"
        shape="smooth"
        color="#c1aeaa"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
      <Geom
        type="line"
        position="time*Diffuse"
        shape="smooth"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
      <Geom
        type="line"
        position="time*Temperature"
        shape="smooth"
        color="#e0e066"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
    </Chart>
  );
};

export default withLocalize(Curved);
