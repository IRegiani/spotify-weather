import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';

import { configureStore } from './state/store';
import Routes from './routes';

// TODO: refactor CSS
import './index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
