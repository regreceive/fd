import React from 'react';
import { Translate } from 'react-localize-redux';

import './index.css';
import { IUser } from 'src/reducers/userReducer';

interface IProps {
  currentCoast: IUser['currentCoast'];
}

const DetailInfo = (props: IProps) => {
  const { total } = props.currentCoast;
  return (
    <div styleName="section">
      <div>
        {/* <dl>
          <dt>
            <Translate id="consumer.exchange.detail.current" />
          </dt>
          <dd>
            <Translate id="kw" data={{ kw: total.eletric }} />
          </dd>
        </dl> */}
        <dl>
          <dt>
            <Translate id="consumer.exchange.detail.before" />
          </dt>
          <dd>{total.pre}</dd>
        </dl>
        <dl>
          <dt>
            <Translate id="consumer.exchange.detail.after" />
          </dt>
          <dd>{total.after}</dd>
        </dl>
      </div>
    </div>
  );
};

export default DetailInfo;
