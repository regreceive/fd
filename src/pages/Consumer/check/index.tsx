import React, { Component } from 'react';
import './index.css';
import { RouteComponentProps } from 'react-router';
import { Translate } from 'react-localize-redux';
import { Icon, NavBar } from 'antd-mobile';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCheck } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { startedDadeTime } from '../../../utils/timeFormat';

interface IStateProps {
  checkDetail: IUser['checkDetail'];
}

interface IDispatchProps {
  getCheck: typeof getCheck;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  checkDetail: state.user.checkDetail,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getCheck: () => dispatch(getCheck()),
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
    this.injected.getCheck();
  }
  public render() {
    return (
      <div styleName="container">
        <div styleName="history">
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={this.injected.history.goBack}
          >
            <Translate id="check" />
          </NavBar>
        </div>

        <div styleName="card-deal">
          <div styleName="card-top">
            <ul>
              <li>
                <span>发电量</span>
                <br />
                <span>{this.injected.checkDetail.total.eletric}</span>
              </li>
              <li>
                <span>电价(元/度)</span>
                <br />
                <span>{this.injected.checkDetail.total.price}</span>
              </li>
            </ul>
          </div>
          <p>用电时间段 2018-09-09 12:00:00-12:59:59</p>
        </div>
        <div styleName="detail">账单详情</div>
        <div styleName="count">
          <span>用电量/KW</span> <span styleName="conuntSpan">总费用/EDF</span>{' '}
          <span>用电时间段</span>
        </div>
        {this.injected.checkDetail.list.map((item, index) => (
          <div styleName="number" key={index}>
            <span>{item.eletric}</span> <span>{item.price}</span>{' '}
            <span>{startedDadeTime(item.index)}</span>
          </div>
        ))}
      </div>
    );
  }
}
