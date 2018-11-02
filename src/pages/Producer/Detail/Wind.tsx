import React from 'react';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import {
  getChartsData,
  realTimeImmutableData,
  realTimeMutableData,
} from '../../data';
import Charts from '../Home/Charts/wind';

import './index.css';

interface IStateProps {
  role: IUser['role'];
  goBack: () => void;
}

const Wind = (prop: IStateProps) => {
  const { role, goBack } = prop;
  const mutableData = realTimeMutableData(role);
  const immutableData = realTimeImmutableData(role);
  const data = getChartsData(role);

  return (
    <div styleName="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={goBack}>
        <Translate id="wind" />
      </NavBar>
      <Charts data={data} />
      <div styleName="section">
        <div>
          <h2>
            <Translate id="producer.home.detail.wind.title1" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.output" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.speed" />
            </dt>
            <dd>{mutableData[1]} m/s</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.wind.title2" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.generation" />
            </dt>
            <dd>
              <Translate id="kw" data={{ kw: `${10}` }} />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.coast" />
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
            <Translate id="producer.home.detail.wind.title3" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.power" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.wind.genetateCoast" />
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

export default Wind;
