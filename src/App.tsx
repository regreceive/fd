import React from 'react';
import { Button } from 'antd-mobile';

import './App.css';

import Logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div styleName="App">
        <header>
          <Logo alt="logo" />
          <h1>Welcome to React</h1>
        </header>
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
