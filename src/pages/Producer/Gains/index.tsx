import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
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
    const { gainsDetail } = this.injected;
    return (
      <div styleName="container">
        <div styleName="earnings">
          <div styleName="earnings-inset">
            <Translate id="producer.gains.title" />
            <p>
              <Translate id="producer.gains.totalProfit" />
            </p>
          </div>
          <div styleName="earnings-bottom">
            <ul>
              <li>
                <span>{gainsDetail.total.eletric}</span>
                <br />
                <span>
                  <Translate id="producer.gains.header.output" />
                </span>
              </li>
              <li>
                <span>{gainsDetail.total.userTotal}</span>
                <br />
                <span>
                  <Translate id="producer.gains.header.userProfit" />
                </span>
              </li>
              <li>
                <span>{gainsDetail.total.otherTotal}</span>
                <br />
                <span>
                  <Translate id="producer.gains.header.largeProfit" />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {gainsDetail.list.map((item, index) => (
          <div styleName="card" key={index}>
            <div styleName="card-top">
              <ul>
                <li>
                  <span>
                    <Translate id="producer.gains.card.output" />
                  </span>
                  <br />
                  <span>{item.eletric}</span>
                </li>
                <li>
                  <span>
                    <Translate id="producer.gains.card.userProfit" />
                  </span>
                  <br />
                  <span styleName="detailSpan">{item.userTotal}</span>
                </li>
                <li>
                  <span>
                    <Translate id="producer.gains.card.largeProfit" />
                  </span>
                  <br />
                  {item.otherTotal !== 0 && (
                    <span styleName="blue">{item.otherTotal}</span>
                  )}
                  {item.otherTotal === 0 && <span styleName="blue">——</span>}
                </li>
              </ul>
            </div>
            <p>
              <Translate id="producer.gains.card.time" />{' '}
              {startedDateTime(item.index)}{' '}
            </p>
          </div>
        ))}
      </div>
    );
  }
}
