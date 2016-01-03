import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import map from './map';

export default combineReducers({
  routing: routeReducer,
  map,
});
