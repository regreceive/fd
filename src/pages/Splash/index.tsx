import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import ReactSVG from 'react-svg';

import logo from './assets/logo.svg';

import './style.css';

export default class extends Component {
  get injected() {
    return this.props as RouteComponentProps;
  }

  public componentDidMount() {
    setTimeout(() => this.injected.history.replace('/login'), 3000);
  }

  public render() {
    return (
      <div styleName="container">
        <ReactSVG src={logo} />
      </div>
    );
  }
}
