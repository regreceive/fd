import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
import { Accordion } from 'antd-mobile';
import './index.css';

export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }
  //   onChange = (key) => {
  //     console.log(key);
  //   }
  public render() {
    return (
      <div styleName="container">
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
    );
  }
}
