import diff from 'immutablediff';

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

  console.log('Diff', diff(todos, nextTodos).toJS());

  return result;
}

export default {
  logger,
  api
};
