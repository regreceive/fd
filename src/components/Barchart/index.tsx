import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
export default class Barchart extends Component {
  public render() {
    // 数据源
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 },
    ];

    // 定义度量
    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' },
    };
    const color1 = 'l (270) 0:#A6CCEA 1:#0057FF';
    const color2 = 'l (270) 0:#FF9131 1:#FE5816';
    return (
      <div>
        <h2>用电量</h2>
        <Chart height={300} data={data} scale={cols} padding="auto" forceFit>
          <Axis name="genre" />
          <Axis name="sold" />
          <Tooltip />
          <Geom
            type="interval"
            position="genre*sold"
            color={['genre', [color1, color2]]}
            size={12}
          />
        </Chart>
      </div>
    );
  }
}
