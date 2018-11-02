import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, InputItem } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import { timeFormat } from '../../../utils/timeFormat';
import { IUser } from '../../../reducers/userReducer';
import { postOffer } from '../../../actions/userActions';
import { IStoreState } from '../../../types';
import { realTimePrice } from '../../data';

import css from './index.css';

interface IState {
  countdown: number;
}

interface IStateProps {
  price: IUser['offer']['price'];
  timestamp: IUser['offer']['timestamp'];
  waiting: boolean;
}

interface IDispatchToState {
  postOffer: typeof postOffer;
}

const interval = Number(process.env.REACT_APP_OFFER_INTERVAL);

const mapStateToProps = (state: IStoreState): IStateProps => ({
  price: state.user.offer.price,
  timestamp: state.user.offer.timestamp,
  waiting: state.ui.freeze.postOffer === 1,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToState => ({
  postOffer: (power: number, price: number) =>
    dispatch(postOffer(power, price)),
});

@(connect(
  mapStateToProps,
  mapDispatchToProps,
) as any)
export default class extends React.Component<{}, IState> {
  get injected() {
    return this.props as IStateProps & IDispatchToState;
  }
  public state = {
    countdown: 0,
  };

  private power = 0;
  private price = 0;
  private interval = 0;

  public componentWillReceiveProps(nextProps: IStateProps) {
    const countdown = nextProps.timestamp + interval * 60 * 1000 - Date.now();
    if (countdown > 0) {
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
    const { waiting } = this.injected;
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
              <Translate id="edf-per-kw" data={{ edf: realTimePrice() }} />
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
              extra="度"
              type="digit"
              onChange={this.powerChangeHandle}
            />
          </dl>
          <dl>
            <dt>
              <Translate id="producer.home.offer.price" />
            </dt>
            <InputItem
              extra="EDF/度"
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
      const countdown = this.state.countdown - 1000;
      this.setState({ countdown });
      if (countdown <= 0) {
        this.setState({ countdown: 0 });
        window.clearInterval(this.interval);
      }
    }, 1000);
  }

  private clickHandle = () => {
    this.injected.postOffer(this.power, this.price);
  };

  private powerChangeHandle = (value: string) => {
    this.power = Number(value);
  };

  private priceChangeHandle = (value: string) => {
    this.price = Number(value);
  };
}
