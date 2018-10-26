import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { LocationState, Path } from 'history';

import { basePath } from '../../../services/constants';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { getChartsData, realTimePrice } from '../../data';
import Curved from '../../../components/Charts';
import { getCheck, getPriceConstitute } from '../../../actions/userActions';
import './index.css';

interface IStateProps {
  role: IUser['role'];
  priceConstitute: IUser['priceConstitute'];
  price: number;
  eletric: number;
}

interface IDispatchProps {
  getPriceConstitute: typeof getPriceConstitute;
  getCheck: typeof getCheck;
  push: (path: Path, state?: LocationState) => void;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  priceConstitute: state.user.priceConstitute,
  price: state.user.checkDetail.total.price,
  eletric: state.user.checkDetail.total.eletric,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getPriceConstitute: () => dispatch(getPriceConstitute()),
  push: (path: Path, state?: LocationState) => dispatch(push(path, state)),
  getCheck: () => dispatch(getCheck()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps;
  }

  public componentDidMount() {
    this.injected.getPriceConstitute();
    this.injected.getCheck();
  }

  public render() {
    const { role } = this.injected;
    const data = getChartsData(role);

    return (
      <div styleName="container">
        <h2>
          <Translate id={'role.' + role.toLocaleLowerCase()} />
        </h2>
        <Curved data={data} />
        <div styleName="section">
          <div>
            <div styleName="head-area">
              <h2>当前电价组成</h2>
              <a onClick={this.linkHandle}>
                <Translate id="more" />
              </a>
            </div>
            <dl>
              <dt>今日用电总量</dt>
              <dd>0 度</dd>
            </dl>
            <dl>
              <dt>当前用电价</dt>
              <dd>1 EDF/度</dd>
            </dl>
            <dl>
              <dt>当前大电网电价</dt>
              <dd>{realTimePrice()} EDF/度</dd>
            </dl>
          </div>
        </div>

        <div styleName="section spacer">
          <div>
            <div styleName="head-area">
              <h2 styleName="spacer">我的账单</h2>
              <Link to="/consumer/check">
                <Translate id="bill-detail" />
              </Link>
            </div>
            <dl>
              <dt>当前已用电量</dt>
              <dd>{this.injected.eletric} 度</dd>
            </dl>
            <dl>
              <dt>用电花费</dt>
              <dd>{this.injected.price} EDF</dd>
            </dl>
            <dl>
              <dt>已省</dt>
              <dd>1000 EDF</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }

  private linkHandle = () => {
    this.injected.push(
      basePath + '/consumer/constitute',
      this.injected.priceConstitute,
    );
  };
}
