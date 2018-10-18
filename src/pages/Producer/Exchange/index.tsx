import React, { Component } from 'react';
// import { Translate } from 'react-localize-redux';
export default class extends Component {
  public shouldComponentUpdate() {
    return false;
  }
  public render() {
    console.log(111);
    return <div>gains</div>;
  }
}
