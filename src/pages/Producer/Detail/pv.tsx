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

interface IStateProps {
  role: IUser['role'];
  goBack: () => void;
}

const Photovoltaic = (prop: IStateProps) => {
  const { role, goBack } = prop;
  const mutableData = realTimeMutableData(role);
  const immutableData = realTimeImmutableData(role);
  const data = getChartsData(role);

  return (
    <div styleName="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={goBack}>
        <Translate id="sun" />
      </NavBar>
      <Charts data={data} />
      <div styleName="section">
        <div>
          <h2>
            <Translate id="producer.home.detail.pv.title1" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.output" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.beat" />
            </dt>
            <dd>{mutableData[1]} kW/m2</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.scatter" />
            </dt>
            <dd>{mutableData[2]} kW/m2</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.temperature" />
            </dt>
            <dd>{mutableData[3]} ºC</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.pv.title2" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.generation" />
            </dt>
            <dd>10 度</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.coast" />
            </dt>
            <dd>
              <Translate id="edf-per-kw" data={{ edf: immutableData[0] }} />
            </dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.pv.title3" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.power" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.pv.genetateCoast" />
            </dt>
            <dd>
              <Translate id="edf-per-kw" data={{ edf: immutableData[2] }} />
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Photovoltaic;
