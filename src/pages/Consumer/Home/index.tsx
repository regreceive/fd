import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Translate } from 'react-localize-redux';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { getChartsData, realTimePrice } from '../../data';
import Curved from '../../../components/Charts';
import { getPriceConstitute } from '../../../actions/userActions';

import './index.css';
import { Dispatch } from 'redux';

interface IStateProps {
  role: IUser['role'];
  priceConstitute: IUser['priceConstitute'];
}

interface IDispatchProps {
  getPriceConstitute: typeof getPriceConstitute;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  priceConstitute: state.user.priceConstitute,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getPriceConstitute: () => dispatch(getPriceConstitute()),
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
  }

  public render() {
    const { role } = this.injected;
    const data = getChartsData(role);

    return (
      <div styleName="container">
        <Curved data={data} />
        <div styleName="section">
          <div>
            <h2>当前电价组成</h2>
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
            <h2 styleName="spacer">我的账单</h2>
            <dl>
              <dt>当前已用电量</dt>
              <dd>0 度</dd>
            </dl>
            <dl>
              <dt>用电花费</dt>
              <dd>1 EDF</dd>
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
}
