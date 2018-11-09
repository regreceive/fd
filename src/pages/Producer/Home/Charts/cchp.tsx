import React from 'react';
import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import convert from '../../../../utils/convert';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';
interface IProps extends LocalizeContextProps {
  data: object[];
}

const Curved = (props: IProps) => {
  const translate = convert(props.translate);
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
      ].slice(0, Math.ceil(new Date().getHours() / 3)),
      tickCount: 8,
    },
    Output: {
      alias: translate('Output'),
    },
    ColdLoad: {
      alias: translate('ColdLoad'),
    },
    ThermalLoad: {
      alias: translate('ThermalLoad'),
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
      <Axis name="ColdLoad" visible={false} />
      <Axis name="ThermalLoad" visible={false} />
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
        position="time*ColdLoad"
        shape="smooth"
        color="#c1aeaa"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
      <Geom
        type="line"
        position="time*ThermalLoad"
        shape="smooth"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
    </Chart>
  );
};

export default withLocalize(Curved);
