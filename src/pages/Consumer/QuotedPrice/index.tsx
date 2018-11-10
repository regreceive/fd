import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Icon, List, NavBar } from 'antd-mobile';
import { Translate } from 'react-localize-redux';

import { getPriceConstitute } from '../../../actions/userActions';
import { IUser } from '../../../reducers/userReducer';
import { IStoreState } from '../../../types';

import './index.css';

interface IStateProps {
  priceConstitute: IUser['priceConstitute'];
}

interface IDispatchProps {
  getPriceConstitute: typeof getPriceConstitute;
}

const mapStateToProps = (state: IStoreState): IStateProps => ({
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
    return this.props as IStateProps & IDispatchProps & RouteComponentProps;
  }

  public componentDidMount() {
    this.injected.getPriceConstitute();
  }

  public render() {
    const { list } = this.injected.priceConstitute;
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="quto" />
        </NavBar>

        <div>
          <List>
            {list.map(sell => (
              <List.Item
                extra={<Translate id="edf-per-kw" data={{ edf: sell.quote }} />}
                key={sell.item}
              >
                <Translate id={'role.' + sell.item.toLowerCase()} />
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    );
  }
}
