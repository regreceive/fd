import React from 'react';
import { IUser } from '../../../reducers/userReducer';
import './index.css';

interface IProps {
  role: IUser['role'];
  data: IUser['earns'];
}

const Earns = (props: IProps) => {
  const { eletric, price } = props.data;
  return (
    <div styleName="earns">
      <h2>我的收益</h2>
      <div styleName="box">
        <div styleName="first">
          <span>{eletric} 度</span>
          <span>共售卖</span>
        </div>
        <div styleName="second">
          <span>{price ? (price / eletric).toFixed(2) : 0} EDF/度</span>
          <span>电价均值</span>
        </div>
        <div styleName="third">
          <span>{price} EDF</span>
          <span>总费用</span>
        </div>
      </div>
    </div>
  );
};

export default Earns;
