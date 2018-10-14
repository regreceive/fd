import React from 'react';
// import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import './index.css';

interface IProps {
  role: IUser['role'];
  data: IUser['currentState'];
}

const CurrentState = (props: IProps) => {
  return (
    <div styleName="section">
      <div>
        <h2>当前状态</h2>
        <div>
          <span>当前天气状况的发电量</span>
          <span>{props.data.power} 度</span>
        </div>
        <div>
          <span>发电综合成本(单位:*/kwh)</span>
          <span>{props.data.cost} EDF/度</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentState;
