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
import { realTimePrice } from '../../data';
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

    return (
      <div styleName="container">
        <div styleName="banner">
          <h2>
            <Translate id={'role.' + role.toLocaleLowerCase()} />
          </h2>
        </div>
        <div styleName="section">
          <div>
            <div styleName="head-area">
              <h2>
                <Translate id="consumer.home.title1" />
              </h2>
              <a onClick={this.linkHandle}>
                <Translate id="more" />
              </a>
            </div>
            <dl>
              <dt>
                <Translate id="consumer.home.total" />
              </dt>
              <dd>{this.injected.priceConstitute.statistics.eletric} 度</dd>
            </dl>
            <dl>
              <dt>
                <Translate id="consumer.home.current" />
              </dt>
              <dd>
                {this.injected.priceConstitute.statistics.unitPrice} EDF/度
              </dd>
            </dl>
            <dl>
              <dt>
                <Translate id="consumer.home.large" />
              </dt>
              <dd>
                <Translate id="edf-per-kw" data={{ edf: realTimePrice() }} />
              </dd>
            </dl>
          </div>
        </div>

        <div styleName="section spacer">
          <div>
            <div styleName="head-area">
              <h2 styleName="spacer">
                <Translate id="consumer.home.title2" />
              </h2>
              <Link to="/consumer/check">
                <Translate id="bill-detail" />
              </Link>
            </div>
            <dl>
              <dt>
                <Translate id="consumer.home.used" />
              </dt>
              <dd>{this.injected.eletric} 度</dd>
            </dl>
            <dl>
              <dt>
                <Translate id="consumer.home.coast" />
              </dt>
              <dd>{this.injected.price} EDF</dd>
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
