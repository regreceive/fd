import React from 'react';
import { IUser } from '../../../reducers/userReducer';
import {
  getChartsData,
  realTimeImmutableData,
  realTimeMutableData,
} from '../../data';
import Charts from '../../../components/Charts';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import './index.css';

interface IStateProps {
  role: IUser['role'];
  goBack: () => void;
}

const Battery = (prop: IStateProps) => {
  const { role, goBack } = prop;
  const mutableData = realTimeMutableData(role);
  const immutableData = realTimeImmutableData(role);
  const data = getChartsData(role);

  return (
    <div styleName="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={goBack}>
        <Translate id="battery" />
      </NavBar>
      <Charts data={data} />
      <div styleName="section">
        <div>
          <h2>储能电站相关参数</h2>
          <dl>
            <dt>发电量</dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>剩余电量</dt>
            <dd>{mutableData[1]} kW</dd>
          </dl>
          <dl>
            <dt>充电量</dt>
            <dd>{mutableData[2]} kW</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>储能电站固定属性</h2>
          <dl>
            <dt>发电容量(固定值)</dt>
            <dd>10 度</dd>
          </dl>
          <dl>
            <dt>投资成本</dt>
            <dd>{immutableData[0]} EDF/度</dd>
          </dl>
          <dl>
            <dt>分时电价</dt>
            <dd>{immutableData[1]} EDF/度</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>当前储能情况</h2>
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

export default Battery;
