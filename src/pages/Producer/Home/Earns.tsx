import React from 'react';
import { IUser } from '../../../reducers/userReducer';
import './index.css';

interface IProps {
  role: IUser['role'];
  data: IUser['earns'];
}

const Earns = (props: IProps) => {
  const { vol, price, amount } = props.data;
  return (
    <div styleName="earns">
      <h2>我的收益</h2>
      <div styleName="box">
        <div styleName="first">
          <span>{vol} 度</span>
          <span>共售卖</span>
        </div>
        <div styleName="second">
          <span>{price} EDF/度</span>
          <span>电价均值</span>
        </div>
        <div styleName="third">
          <span>{amount} EDF</span>
          <span>总费用</span>
        </div>
      </div>
    </div>
  );
};

export default Earns;
