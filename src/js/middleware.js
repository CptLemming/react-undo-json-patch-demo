import diff from 'immutablediff';
import Api from './api';

const api_instance = new Api('http://localhost:3000/api/v1/');

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const api = store => next => action => {
  const state = store.getState();
  const todos = state.todos.todos;
  const result = next(action);
  const nextState = store.getState();
  const nextTodos = nextState.todos.todos;

  const diffs = diff(todos, nextTodos).toJS();

  console.log('Diff', diffs);

  api_instance.handle_action(action, diffs, store.dispatch);

  return result;
}

export default {
  logger,
  api
};
