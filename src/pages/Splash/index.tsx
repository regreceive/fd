import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

export default class extends Component {
  public render() {
    console.log('aaa');
    return (
      <div>
        <Translate id="pack">hello world</Translate>
      </div>
    );
  }
}
