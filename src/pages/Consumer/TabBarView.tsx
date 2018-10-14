import React from 'react';
import { Translate } from 'react-localize-redux';
import { TabBar } from 'antd-mobile';

import Home from './Home';
import Exchange from './Exchange';
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

const items = [
  { id: 'home', component: Home },
  { id: 'exchange', component: Exchange },
  { id: 'personal', component: Personal },
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
          <TabBar>
            {items.map(({ id, component: Component }) => (
              <TabBar.Item
                key={id}
                title={translate(id) as string}
                icon={<Icon name={id} />}
                selectedIcon={<SelectedIcon name={id} />}
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
