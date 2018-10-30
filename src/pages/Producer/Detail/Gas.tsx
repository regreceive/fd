import React from 'react';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import {
  getChartsData,
  realTimeImmutableData,
  realTimeMutableData,
} from '../../data';
import Charts from '../Home/Charts/pv';

import './index.css';

interface IProps {
  role: IUser['role'];
  goBack: () => void;
}

const Gas = (prop: IProps) => {
  const { role, goBack } = prop;
  const mutableData = realTimeMutableData(role);
  const immutableData = realTimeImmutableData(role);
  const data = getChartsData(role);

  return (
    <div styleName="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={goBack}>
        <Translate id="internal-combustion-engine" />
      </NavBar>
      <Charts data={data} />
      <div styleName="section">
        <div>
          <h2>内燃机电站相关参数</h2>
          <dl>
            <dt>发电量</dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>电制冷机消耗电量</dt>
            <dd>{mutableData[1]} kW</dd>
          </dl>
          <dl>
            <dt>冷负荷</dt>
            <dd>{mutableData[2]} kW</dd>
          </dl>
          <dl>
            <dt>热负荷</dt>
            <dd>{mutableData[3]} kW</dd>
          </dl>
          <dl>
            <dt>燃料价格</dt>
            <dd>{mutableData[4]} RMB/m3</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>内燃机电站固定属性</h2>
          <dl>
            <dt>发电容量(固定值)</dt>
            <dd>10 度</dd>
          </dl>
          <dl>
            <dt>投资成本</dt>
            <dd>{immutableData[0]} EDF/度</dd>
          </dl>
          <dl>
            <dt>燃料成本</dt>
            <dd>{immutableData[1]} EDF/度</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>当前内燃机情况</h2>
          <dl>
            <dt>当前发电出力(变化植)</dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>发电综合成本(变化值)</dt>
            <dd>{immutableData[2]} EDF/度</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Gas;
