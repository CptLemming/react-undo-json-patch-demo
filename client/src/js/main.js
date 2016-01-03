import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import App from './containers/App';
import configureStore from './store';

import '../css/style.scss'

const target = document.getElementById('root');
const store = configureStore();
const history = createHistory();

syncReduxAndRouter(history, store);

const node = (
  <App store={store} history={history} />
);

ReactDOM.render(node, target);
