import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

declare module 'react' {
  // tslint:disable-next-line: interface-name
  interface HTMLAttributes<T> {
    styleName?: string;
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
