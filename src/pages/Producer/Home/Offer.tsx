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
import { getGameIndex, postOffer } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { realTimePrice } from '../../data';
import { show } from '../../../utils/toast';

import css from './index.css';

interface IState {
  countdown: number;
  timestamp: number;
}

interface IStateProps {
  price: IUser['offer']['price'];
  timestamp: IUser['offer']['timestamp'];
  gameIndex: IUser['gameIndex'];
  waiting: boolean;
}

interface IDispatchToState {
  postOffer: typeof postOffer;
  getGameIndex: typeof getGameIndex;
}

const interval = Number(process.env.REACT_APP_OFFER_INTERVAL);

const mapStateToProps = (state: IStoreState): IStateProps => ({
  price: state.user.offer.price,
  timestamp: state.user.offer.timestamp,
  waiting: state.ui.freeze.postOffer === 1,
  gameIndex: state.user.gameIndex,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  postOffer: (power: number, price: number) =>
    dispatch(postOffer(power, price)),
  getGameIndex: () => dispatch(getGameIndex()),
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

  public componentWillMount() {
    this.injected.getGameIndex();
  }

  public componentWillReceiveProps(nextProps: IStateProps) {
    const countdown = nextProps.timestamp + interval * 60 * 1000 - Date.now();
    if (countdown > 0) {
      this.setState(
        { countdown, timestamp: nextProps.timestamp + countdown },
        () => {
          window.clearInterval(this.interval);
          this.countdown();
        },
      );
    }
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    const { gameIndex, waiting } = this.injected;
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
                data={{ edf: realTimePrice(gameIndex) }}
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
      const countdown = this.state.timestamp - Date.now();
      this.setState({ countdown });
      if (countdown <= 0) {
        this.setState({ countdown: 0 });
        window.clearInterval(this.interval);
      }
    }, 1000);
  }

  private clickHandle = () => {
    if (this.power > 0 && this.price > 0) {
      if (this.price < realTimePrice()) {
        const content = this.injected.translate(
          'toast.fail.unit-price-less-than-grid',
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
