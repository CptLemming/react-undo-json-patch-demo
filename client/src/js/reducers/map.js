import Immutable from 'immutable';
import Immstruct from 'immstruct';

import { combineReducers } from 'redux';
import {
  FETCH_MAPS,
  SELECT_MAP,
  CREATE_MAP,
  DELETE_MAP,
  UPDATE_MAP,
  CREATE_CELL,
  UPDATE_CELL,
  UNDO,
  REDO
} from '../actions/map';

const historyLimit = 10;
const structure = Immstruct.withHistory('map', historyLimit, {
  maps: [],
  selected: undefined
});

let mapsCursor = structure.cursor(['maps']);
let selectedCursor = structure.cursor(['selected']);

function mapsReducer(state=mapsCursor, action) {
  let mapIndex = undefined;
  let cellsCursor = undefined;
  switch (action.type) {
    case FETCH_MAPS +'_SUCCESS':
      return state.set(Immutable.fromJS(action.payload.data))
    case CREATE_MAP +'_SUCCESS':
      return state.push(Immutable.fromJS({
        id: action.payload.data.id,
        label: action.payload.data.label,
        height: action.payload.data.height,
        width: action.payload.data.width,
        cells: action.payload.data.cells
      }));
    case CREATE_CELL:
      mapIndex = state.findIndex((item) => item.get('id') === action.payload.map_id);
      let cellsCursor = structure.cursor(['maps', mapIndex, 'cells']);
      cellsCursor.push(Immutable.fromJS({
        map: action.payload.map_id,
        type: action.payload.type,
        position_x: action.payload.position_x,
        position_y: action.payload.position_y
      }));
      return structure.cursor(['maps']);
    case UPDATE_CELL:
      mapIndex = state.findIndex((item) => item.get('id') === action.payload.map_id);
      cellsCursor = structure.cursor(['maps', mapIndex, 'cells']);
      let cell = cellsCursor.find((item) => item.get('id') === action.payload.id);
      cell.update((item) => {
        return item.set('type', action.payload.type)
          .set('position_x', action.payload.position_x)
          .set('position_y', action.payload.position_y);
      });
      return structure.cursor(['maps']);
    case UNDO:
      structure.undo();
      return structure.cursor(['maps']);
    case REDO:
      structure.redo();
      return structure.cursor(['maps']);
    default:
      return state;
  }
}

function selectedReducer(state=selectedCursor, action) {
  switch (action.type) {
    case SELECT_MAP:
      return selectedCursor.set(action.payload.id);
    default:
      return state;
  }
}

function undoReducer(state=false, action) {
  return structure._currentRevision !== 0;
}

function redoReducer(state=false, action) {
  return structure._currentRevision + 1 < structure.history.count();
}

export default combineReducers({
  maps: mapsReducer,
  selected: selectedReducer,
  hasUndo: undoReducer,
  hasRedo: redoReducer
});
