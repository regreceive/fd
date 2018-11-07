import React from 'react';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import {
  getChartsData,
  realTimeImmutableData,
  realTimeMutableData,
} from '../../data';
import Charts from '../Home/Charts/cchp';

import './index.css';

interface IProps {
  role: IUser['role'];
  gameIndex: IUser['gameIndex'];
  goBack: () => void;
}

const Gas = (prop: IProps) => {
  const { role, gameIndex, goBack } = prop;
  const mutableData = realTimeMutableData(role, gameIndex);
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
          <h2>
            <Translate id="producer.home.detail.gas.title1" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.output" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.runPower" />
            </dt>
            <dd>{mutableData[1]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.cold" />
            </dt>
            <dd>{mutableData[2]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.hot" />
            </dt>
            <dd>{mutableData[3]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.price" />
            </dt>
            <dd>{mutableData[4]} RMB/m3</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.gas.title2" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.generation" />
            </dt>
            <dd>
              <Translate id="kw" data={{ kw: `${10}` }} />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.coast" />
            </dt>
            <dd>
              <Translate id="edf-per-kw" data={{ edf: immutableData[0] }} />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.fuel" />
            </dt>
            <Translate id="edf-per-kw" data={{ edf: immutableData[1] }} />
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.gas.title3" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.power" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.gas.genetateCoast" />
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

export default Gas;
