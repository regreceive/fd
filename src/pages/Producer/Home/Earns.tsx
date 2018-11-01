import React from 'react';
import { Translate } from 'react-localize-redux';
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
      <h2>
        <Translate id="producer.home.earns.title" />
      </h2>
      <div styleName="box">
        <div styleName="first">
          <span>
            <Translate id="kw" data={{ kw: eletric }} />
          </span>
          <span>
            <Translate id="producer.home.earns.sales" />
          </span>
        </div>
        <div styleName="second">
          <span>
            <Translate
              id="edf-per-kw"
              data={{ edf: price ? (price / eletric).toFixed(2) : 0 }}
            />
          </span>
          <span>
            <Translate id="producer.home.earns.price" />
          </span>
        </div>
        <div styleName="third">
          <span>
            <Translate id="tc" data={{ tc: price }} />
          </span>
          <span>
            <Translate id="producer.home.earns.totalCount" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Earns;
