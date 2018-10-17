import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import { IUser } from '../../../reducers/userReducer';

import './index.css';

interface IProps {
  role: IUser['role'];
  data: IUser['currentState'];
}

const CurrentState = (props: IProps) => {
  console.log(111);
  return (
    <div styleName="section">
      <div styleName="head-area">
        <h2>
          <Translate id="producer.home.state" />
        </h2>
        <Link to="/producer/detail">
          <Translate id="more" />
        </Link>
      </div>
      <dl>
        <dt>
          <Translate id="producer.home.power" />
        </dt>
        <dd>
          <Translate id="kw" data={{ kw: props.data.power }} />
        </dd>
      </dl>
      <dl>
        <dt>
          <Translate id="producer.home.cost" />
        </dt>
        <dd>
          <Translate id="edf-per-kw" data={{ edf: props.data.cost }} />
        </dd>
      </dl>
    </div>
  );
};

export default CurrentState;
