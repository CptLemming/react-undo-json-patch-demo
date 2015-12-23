var Immutable = require('immutable');
var Immstruct = require('immstruct');

import { combineReducers } from 'redux';
import {
  ADD_TODO,
  SELECT_TODO,
  UPDATE_TODO,
  TOGGLE_COMPLETE_TODO,
  CLEAR_COMPLETED_TODOS,
  UNDO,
  REDO
} from '../actions/todos';

const historyLimit = 10;
const structure = Immstruct.withHistory('todos', historyLimit, {
  'selected': undefined,
  'todos': []
});

var todosCursor = structure.cursor(['todos']);
var selectedCursor = structure.cursor(['selected']);

let nextId = 1;

function todoReducer(state=todosCursor, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.push(Immutable.fromJS({
        'id': nextId++,
        'name': action.payload.name,
        complete: false
      }));
    case UPDATE_TODO:
      return state.update(
        state.findIndex(function(item) {
          return item.get('id') === action.payload.id;
        }),
        function(item) {
          return item.set('name', action.payload.name);
        }
      );
    case TOGGLE_COMPLETE_TODO:
      return state.update(
        state.findIndex(function(item) {
          return item.get('id') === action.payload.id;
        }),
        function(item) {
          return item.set('complete', !item.get('complete'));
        }
      );
    case CLEAR_COMPLETED_TODOS:
      return state.filter((item) => item.get('complete') === false);
    case UNDO:
      structure.undo();
      return structure.cursor(['todos']);
    case REDO:
      structure.redo();
      return structure.cursor(['todos']);
    default:
      return state;
  }
}

function selectedReducer(state=selectedCursor, action) {
  switch (action.type) {
    case SELECT_TODO:
      return action.payload.id;
    case UPDATE_TODO:
      return selectedCursor;
    default:
      return state;
  }
}

export default combineReducers({
  todos: todoReducer,
  selected: selectedReducer
});
