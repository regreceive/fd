import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import './index.css';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getGainsDetail } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';
import { startedDateTime } from '../../../utils/timeFormat';
interface IStateProps {
  gainsDetail: IUser['gainsDetail'];
}

interface IDispatchProps {
  getGainsDetail: typeof getGainsDetail;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
  gainsDetail: state.user.gainsDetail,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getGainsDetail: () => dispatch(getGainsDetail()),
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
    this.injected.getGainsDetail();
  }

  public render() {
    return (
      <div styleName="container">
        <div styleName="earnings">
          <div styleName="earnings-inset">
            收益明细
            <p>总收益</p>
          </div>
          <div styleName="earnings-bottom">
            <ul>
              <li>
                <span>{this.injected.gainsDetail.total.eletric}</span>
                <br />
                <span>发电量(度)</span>
              </li>
              <li>
                <span>{this.injected.gainsDetail.total.userTotal}</span>
                <br />
                <span>用户收益</span>
              </li>
              <li>
                <span>{this.injected.gainsDetail.total.otherTotal}</span>
                <br />
                <span>大电网收益</span>
              </li>
            </ul>
          </div>
        </div>
        <div styleName="detail">收益明细</div>
        {this.injected.gainsDetail.list.map((item, index) => (
          <div styleName="card" key={index}>
            <div styleName="card-top">
              <ul>
                <li>
                  <span>发电量</span>
                  <br />
                  <span>{item.eletric}</span>
                </li>
                <li>
                  <span>用户收益</span>
                  <br />
                  <span styleName="detailSpan">{item.userTotal}</span>
                </li>
                <li>
                  <span>大电网收益</span>
                  <br />
                  {item.otherTotal !== 0 && (
                    <span styleName="blue">{item.otherTotal}</span>
                  )}
                  {item.otherTotal === 0 && <span styleName="blue">——</span>}
                </li>
              </ul>
            </div>
            <p>发电时间 {startedDateTime(item.index)} </p>
          </div>
        ))}
      </div>
    );
  }
}
