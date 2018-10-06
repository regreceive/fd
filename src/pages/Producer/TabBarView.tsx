import React from 'react';
import { Translate } from 'react-localize-redux';
import { TabBar } from 'antd-mobile';

import Home from './Home';
import Exchange from './Exchange';
import Gains from './Gains';
import Personal from './Personal';

import './TabBarView.css';

interface IconProps {
  name: string; // 样式名称
}

interface IState {
  selectedTab: string;
}

const Icon = ({ name }: IconProps) => <div styleName={`icon ${name}`} />;

const SelectedIcon = ({ name }: IconProps) => (
  <div styleName={`icon ${name}-selected`} />
);

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
          <TabBar>
            <TabBar.Item
              title={translate('homepage') as string}
              icon={<Icon name="home" />}
              selectedIcon={<SelectedIcon name="home" />}
              selected={this.state.selectedTab === 'home'}
              onPress={this.pressHandle('home')}
            >
              <Home />
            </TabBar.Item>

            <TabBar.Item
              title={translate('exchange') as string}
              icon={<Icon name="exchange" />}
              selectedIcon={<SelectedIcon name="exchange" />}
              selected={this.state.selectedTab === 'exchange'}
              onPress={this.pressHandle('exchange')}
            >
              <Exchange />
            </TabBar.Item>

            <TabBar.Item
              title={translate('gains') as string}
              icon={<Icon name="gains" />}
              selectedIcon={<SelectedIcon name="gains" />}
              selected={this.state.selectedTab === 'gains'}
              onPress={this.pressHandle('gains')}
            >
              <Gains />
            </TabBar.Item>

            <TabBar.Item
              title={translate('personal') as string}
              icon={<Icon name="personal" />}
              selectedIcon={<SelectedIcon name="personal" />}
              selected={this.state.selectedTab === 'personal'}
              onPress={this.pressHandle('personal')}
            >
              <Personal />
            </TabBar.Item>
          </TabBar>
        )}
      </Translate>
    );
  }
}
