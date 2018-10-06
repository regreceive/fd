import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

import { Button } from 'antd-mobile';

export default class extends Component {
  public render() {
    return (
      <div>
        <Translate id="pack">hello world</Translate>
        <Button>consumer</Button>
      </div>
    );
  }
}
