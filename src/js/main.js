import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import configureStore from './store';

const target = document.getElementById('root');
const store = configureStore();

const node = (
  <App store={store} />
);

ReactDOM.render(node, target);
