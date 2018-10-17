import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { TabBar } from 'antd-mobile';
import ReactSVG from 'react-svg';

import { changeBar } from '../../actions/uiActions';
import { IUi } from '../../reducers/uiReducer';
import { IStoreState } from '../../types';
import Home from './Home';
import Exchange from './Exchange';
import Gains from './Gains';
import Personal from '../../components/Personal';
import homeIcon from '../../components/assets/home.svg';
import exchangeIcon from '../../components/assets/exchange.svg';
import earnsIcon from '../../components/assets/earns.svg';
import personalIcon from '../../components/assets/personal.svg';

import './TabBarView.css';

interface IStateToProps {
  tabId: IUi['tabId'];
}

interface IDispatchToProps {
  changeBar: typeof changeBar;
}

const stateToProps = (state: IStoreState) => ({
  tabId: state.ui.tabId,
});

const dispatchToProps = (dispatch: Dispatch): IDispatchToProps => ({
  changeBar: (id: string) => dispatch(changeBar(id)),
});

const items = [
  { id: 'home', component: Home, svg: homeIcon },
  { id: 'exchange', component: Exchange, svg: exchangeIcon },
  { id: 'gains', component: Gains, svg: earnsIcon },
  { id: 'personal', component: Personal, svg: personalIcon },
];

@(connect(
  stateToProps,
  dispatchToProps,
) as any)
export default class TabBarView extends React.Component {
  get injected() {
    return this.props as IStateToProps & IDispatchToProps;
  }

  public pressHandle = (selectedTab: string) => () => {
    this.injected.changeBar(selectedTab);
  };

  public render() {
    return (
      <Translate>
        {({ translate }) => (
          <TabBar tintColor="#FE5816">
            {items.map(({ id, component: Component, svg }) => (
              <TabBar.Item
                key={id}
                title={translate(id) as string}
                icon={<ReactSVG src={svg} />}
                selectedIcon={<ReactSVG src={svg} styleName="selected" />}
                selected={this.injected.tabId === id}
                onPress={this.pressHandle(id)}
              >
                <Component />
              </TabBar.Item>
            ))}
          </TabBar>
        )}
      </Translate>
    );
  }
}
