import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { NavBar, Accordion, Icon } from 'antd-mobile';
import { RouteComponentProps } from 'react-router';

import './index.css';

export default class extends Component {
  get injected() {
    return this.props as RouteComponentProps;
  }

  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return (
      <div styleName="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.injected.history.goBack}
        >
          <Translate id="help-center" />
        </NavBar>
        <div styleName="content">
          <h2>帮助中心</h2>
          <Accordion defaultActiveKey="0" className="my-accordion">
            <Accordion.Panel header="Title 1">ffffffff</Accordion.Panel>
            <Accordion.Panel header="Title 2" className="pad">
              this is panel content2 or other
            </Accordion.Panel>
            <Accordion.Panel header="Title 3" className="pad">
              text text text text text text text text text text text text text
              text text
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    );
  }
}
