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
      ],
      tickCount: 8,
      alias: translate('unit'),
    },
    Output: {
      alias: translate('Output'),
    },
    Speed: {
      alias: translate('Speed'),
    },
  };
  const bg = {
    fill: '#fff',
  };
  const title = {
    textStyle: {
      fontSize: '12',
      textAlign: 'right',
      fill: '#999',
    },
    position: 'end',
  };
  const output = {
    textStyle: {
      fontSize: '12',
      fill: '#999',
      rotate: -90,
    },
    position: 'end',
  };
  return (
    <Chart
      data={props.data}
      scale={scale}
      forceFit
      height={300}
      background={bg}
      padding={[40, 30, 90, 60]}
    >
      <Legend itemFormatter={translate} />
      <Axis name="time" title={title} />
      <Axis name="Output" title={output} />
      <Axis name="Speed" visible={false} />
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
        size={2}
        style={{
          shadowColor: 'lightgray',
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 3,
        }}
      />
      <Geom
        type="line"
        position="time*Speed"
        shape="smooth"
        color="#c1aeaa"
        size={2}
        style={{
          lineDash: [5, 2],
        }}
      />
    </Chart>
  );
};

export default withLocalize(Curved);
