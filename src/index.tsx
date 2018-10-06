import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizeProvider } from 'react-localize-redux';

import { store, persistor } from './store';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/Layout';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LocalizeProvider>
        <Layout />
      </LocalizeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
