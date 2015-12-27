import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import Immstruct from 'immstruct';
import Immutable from 'immutable';
import App from './containers/App';
import configureStore from './store';

let initial = undefined;

if (window.__initial__ && window.__initial__.todos && window.__initial__.todos.todos) {
  // Server rendering
  let structure = Immstruct('todos')
  let todosReference = structure.reference(['todos']);
  let nextIdReference = structure.reference(['nextId']);
  todosReference.cursor().set(Immutable.fromJS(window.__initial__.todos.todos));
  nextIdReference.cursor().set(window.__initial__.todos.nextId);
  initial = {
    todos: {
      todos: todosReference.cursor()
    }
  };
}

const target = document.getElementById('root');
const store = configureStore(initial);
const history = createHistory();

syncReduxAndRouter(history, store);

const node = (
  <App store={store} history={history} />
);

ReactDOM.render(node, target);
