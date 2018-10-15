import React from 'react';
import { Translate } from 'react-localize-redux';
import { TabBar } from 'antd-mobile';
import ReactSVG from 'react-svg';

import Home from './Home';
import Exchange from './Exchange';
import Gains from './Gains';
import Personal from '../../components/Personal';
import homeIcon from '../../components/assets/home.svg';
import exchangeIcon from '../../components/assets/exchange.svg';
import earnsIcon from '../../components/assets/earns.svg';
import personalIcon from '../../components/assets/personal.svg';

import './TabBarView.css';

interface IState {
  selectedTab: string;
}

const items = [
  { id: 'home', component: Home, svg: homeIcon },
  { id: 'exchange', component: Exchange, svg: exchangeIcon },
  { id: 'gains', component: Gains, svg: earnsIcon },
  { id: 'personal', component: Personal, svg: personalIcon },
];

export default class TabBarView extends React.Component<{}, IState> {
  public state = {
    selectedTab: 'home',
  };

  public pressHandle = (selectedTab: string) => () => {
    this.setState({ selectedTab });
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
                selected={this.state.selectedTab === id}
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
