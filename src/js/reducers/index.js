import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import todos from './todos';

export default combineReducers({
  routing: routeReducer,
  todos,
});
