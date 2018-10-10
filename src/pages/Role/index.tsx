import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';

import { chooseRole } from '../../actions/userActions';

import './index.css';

interface IDispatchProps {
  push: (path: string) => void;
  chooseRole: (role: number) => void;
}

const basePath = process.env.REACT_APP_BASE_PATH;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  push: (path: string) => dispatch(push(path)),
  chooseRole: (role: number) => dispatch(chooseRole(role)),
});

@(connect(
  null,
  mapDispatchToProps,
) as any)
export default class extends Component {
  get injected() {
    return this.props as IDispatchProps;
  }

  public clickHandle = () => {
    this.injected.chooseRole(1);
    this.injected.push(basePath + '/agreement');
  };

  public render() {
    return (
      <div styleName="container">
        <Button type="primary" onClick={this.clickHandle}>
          <Translate id="login.next" />
        </Button>
      </div>
    );
  }
}
