import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Translate } from 'react-localize-redux';
import { Icon, NavBar } from 'antd-mobile';

import { getQuotePrice } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { dateTimeFormat } from '../../../utils/timeFormat';
import './index.css';

interface IStateProps {
  quotePrice: IUser['quotePrice'];
}

interface IDispatchProps {
  getQuotePrice: typeof getQuotePrice;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  quotePrice: state.user.quotePrice,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getQuotePrice: () => dispatch(getQuotePrice()),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    this.injected.getQuotePrice();
  }

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="historical-quote" />
        </NavBar>
        {this.injected.quotePrice.map((item, index) => (
          <div styleName="card" key={index}>
            <div styleName="card-top">
              <ul>
                <li>
                  <span>发电量</span>
                  <span>{item.amount}</span>
                </li>
                <li>
                  <span>用户收益</span>
                  <span>{item.earning}</span>
                </li>
                <li>
                  <span>状态</span>
                  {item.status === 0 && <span styleName="blue">待审核</span>}
                  {item.status === 1 && <span styleName="lose">审核失败</span>}
                </li>
              </ul>
            </div>
            <p>发电时间 {dateTimeFormat(item.time)}</p>
          </div>
        ))}
      </div>
    );
  }
}
