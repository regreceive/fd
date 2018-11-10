import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import {
  LocalizeContextProps,
  Translate,
  withLocalize,
} from 'react-localize-redux';

import { timeFormat } from '../../../utils/timeFormat';
import { IUser } from '../../../reducers/userReducer';
import { getGameTime, postOffer } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { getChartsData, realTimePrice } from '../../data';
import { show } from '../../../utils/toast';

import css from './index.css';

interface IState {
  countdown: number;
}

interface IStateProps {
  role: IUser['role'];
  price: IUser['offer']['price'];
  timestamp: IUser['offer']['timestamp'];
  gameTime: IUser['gameTime'];
  waiting: boolean;
}

interface IDispatchToState {
  postOffer: typeof postOffer;
  getGameTime: typeof getGameTime;
}

const interval = Number(process.env.REACT_APP_OFFER_INTERVAL);

const mapStateToProps = (state: IStoreState): IStateProps => ({
  role: state.user.role,
  price: state.user.offer.price,
  timestamp: state.user.offer.timestamp,
  waiting: state.ui.freeze.postOffer === 1,
  gameTime: state.user.gameTime,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  postOffer: (power: number, price: number) =>
    dispatch(postOffer(power, price)),
  getGameTime: () => dispatch(getGameTime()),
});

@(withLocalize as any)
@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends React.Component<{}, IState> {
  get injected() {
    return this.props as IStateProps & IDispatchToState & LocalizeContextProps;
  }
  public state = {
    countdown: 0,
    timestamp: 0,
  };

  private power = 0;
  private price = 0;
  private interval = 0;
  private deadline = 0;
  private data = [];

  public componentWillMount() {
    this.injected.getGameTime();
  }

  public componentWillReceiveProps(nextProps: IStateProps) {
    const countdown = nextProps.timestamp + interval * 60 * 1000 - Date.now();
    if (countdown > 0) {
      this.deadline = nextProps.timestamp + countdown;
      this.setState({ countdown }, () => {
        window.clearInterval(this.interval);
        this.countdown();
      });
    }
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    const { gameTime, waiting, role } = this.injected;
    this.data = getChartsData(role);

    return (
      <div styleName="section">
        <div>
          <div styleName="head-area">
            <h2>
              <Translate id="producer.home.offer.info" />
            </h2>
            <Link to="/producer/quote">
              <Translate id="producer.home.offer.historyPrice" />
            </Link>
          </div>
          <dl>
            <dt>
              <Translate id="producer.home.offer.realTime" />
            </dt>
            <dd>
              <Translate
                id="edf-per-kw"
                data={{ edf: realTimePrice(gameTime) }}
              />
            </dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.offer.nextOffer" />
            </dt>
            <dd>{timeFormat(this.state.countdown)}</dd>
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.offer.output" />
            </dt>
            <InputItem
              extra={this.injected.translate('degree')}
              type="digit"
              onChange={this.powerChangeHandle}
            />
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.offer.price" />
            </dt>
            <InputItem
              extra={this.injected.translate('per-degree')}
              type="digit"
              onChange={this.priceChangeHandle}
            />
          </dl>
          {/*<dl styleName="no-border">*/}
          {/*<dt>*/}
          {/*<a>*/}
          {/*<Translate id="producer.home.offer.quotedPrice" />*/}
          {/*</a>*/}
          {/*</dt>*/}
          {/*</dl>*/}
        </div>
        <Button
          type="ghost"
          className={css.button}
          disabled={waiting}
          onClick={this.clickHandle}
        >
          <Translate id="producer.home.offer.button" />
        </Button>
      </div>
    );
  }

  private countdown() {
    this.interval = window.setInterval(() => {
      const countdown = this.deadline - Date.now();
      this.setState({ countdown });
      if (countdown <= 50000 && countdown > 49000) {
        const content = this.injected.translate(
          'toast.quote_will_be_finished',
        ) as string;
        show('fail', content);
      }

      if (countdown <= 0) {
        this.setState({ countdown: 0 });
        window.clearInterval(this.interval);
      }
    }, 1000);
  }

  private clickHandle = () => {
    if (this.power > 0 && this.price > 0) {
      if (this.price > realTimePrice(this.injected.gameTime)) {
        const content = this.injected.translate(
          'toast.fail.unit-price-great-than-grid',
        ) as string;
        show('fail', content);
        return;
      }
      if (this.power > this.data[(18 + this.injected.gameTime) % 24]) {
        const content = this.injected.translate(
          'toast.fail.power_exceed',
        ) as string;
        show('fail', content);
        return;
      }
      this.injected.postOffer(this.power, this.price);
    } else {
      const content = this.injected.translate(
        'toast.fail.fill-valid-data',
      ) as string;
      show('fail', content);
    }
  };

  private powerChangeHandle = (value: string) => {
    this.power = Number(value);
  };

  private priceChangeHandle = (value: string) => {
    this.price = Number(value);
  };
}
