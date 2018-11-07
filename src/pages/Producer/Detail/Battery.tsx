import React from 'react';

import { IUser } from '../../../reducers/userReducer';
import { realTimeImmutableData, realTimeMutableData } from '../../data';
import DashBoard from '../Home/Charts/DashBoard';
import { Icon, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';
import './index.css';

interface IProps {
  role: IUser['role'];
  gameIndex: IUser['gameIndex'];
  goBack: () => void;
}

const Battery = (prop: IProps) => {
  const { role, gameIndex, goBack } = prop;
  const mutableData = realTimeMutableData(role, gameIndex);
  const immutableData = realTimeImmutableData(role);

  return (
    <div styleName="container">
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={goBack}>
        <Translate id="battery" />
      </NavBar>
      <DashBoard data={[]} />
      <div styleName="section">
        <div>
          <h2>
            <Translate id="producer.home.detail.battery.title1" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.output" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.rest" />
            </dt>
            <dd>{mutableData[1]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.charge" />
            </dt>
            <dd>{mutableData[2]} kW</dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.battery.title2" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.generation" />
            </dt>
            <dd>
              <Translate id="kw" data={{ kw: `${10}` }} />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.coast" />
            </dt>
            <dd>
              <Translate id="edf-per-kw" data={{ edf: immutableData[0] }} />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.time" />
            </dt>
            <dd>
              <Translate id="edf-per-kw" data={{ edf: immutableData[1] }} />
            </dd>
          </dl>
        </div>
      </div>

      <div styleName="section spacer">
        <div>
          <h2>
            <Translate id="producer.home.detail.battery.title3" />
          </h2>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.power" />
            </dt>
            <dd>{mutableData[0]} kW</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.detail.battery.genetateCoast" />
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

export default Battery;
