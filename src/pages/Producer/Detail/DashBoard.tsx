import React from 'react';
import { Chart, Coord, Geom, Axis, Guide, View } from 'bizcharts';

const { Text } = Guide;
import './index.css';

const data1: Array<{ type: string; value: number }> = [];
for (let i = 0; i < 50; i++) {
  const item = { type: `${i}`, value: 10 };
  data1.push(item);
}

const DashBoard = () => {
  const cols = { type: { range: [0, 1] }, value: { sync: true } };

  return (
    <div styleName="chart">
      <Chart height={300} scale={cols} padding="auto" forceFit>
        <View data={data1}>
          <Coord type="polar" radius={0.8} innerRadius={0.75} />
          <Geom
            type="interval"
            position="type*value"
            color="#F6F6F6"
            size={5}
          />
        </View>
        <View data={data1}>
          <Coord type="polar" radius={0.55} innerRadius={0.95} />
          <Geom
            type="interval"
            position="type*value"
            color="#F6F6F6"
            size={5}
          />
          <Axis name="type" visible={false} />
          <Axis name="value" visible={false} />
        </View>
        <View>
          <Guide>
            <Text
              position={['50%', '50%']}
              content="28%"
              style={{
                fill: '#F6F6F6',
                fontSize: 50,
                textAlign: 'center',
                textBaseline: 'middle',
              }}
            />
          </Guide>
        </View>
      </Chart>
    </div>
  );
};
export default DashBoard;
