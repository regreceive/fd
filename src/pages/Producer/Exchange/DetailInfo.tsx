import React from 'react';
import './index.css';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  currentCoast: IUser['currentCoast'];
}

const DetailInfo = (props: IProps) => {
  const { currentpower, before, after } = props.currentCoast;
  return (
    <div styleName="section">
      <div>
        <dl>
          <dt>截止到当前时刻</dt>
          <dd> {currentpower}度</dd>
        </dl>
        <dl>
          <dt>调整前用电花费</dt>
          <dd>
            {' '}
            {before}
            EDF{' '}
          </dd>
        </dl>
        <dl>
          <dt>调整后用电花费</dt>
          <dd>
            {' '}
            {after}
            EDF{' '}
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default DetailInfo;
