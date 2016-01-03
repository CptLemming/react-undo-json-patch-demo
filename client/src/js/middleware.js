import diff from 'immutablediff';
import Api from './api';
import {
  CREATE_MAP,
  FETCH_MAPS
} from './actions/map';

const api_instance = new Api('http://localhost:8000/api/v1/map/');

const api = store => next => action => {
  if (action.patch) {
    const state = store.getState();
    const maps = state.map.maps.deref();
    const selected = state.map.selected.deref();
    const map = maps.find((item) => item.get('id') == selected);

    if (map) {
      const result = next(action);
      const nextState = store.getState();
      const nextMaps = nextState.map.maps.deref();

      const nextMap = nextMaps.find((item) => item.get('id') == selected);

      if (nextMap) {
        const diffs = diff(map, nextMap).toJS();
        console.log('Diff', diffs);

        api_instance.patch_map(selected, action, diffs, store.dispatch);
        return result;
      }
    }
  }

  if (action.type === FETCH_MAPS) {
    api_instance.get_map_list(action, store.dispatch);
  }
  if (action.type === CREATE_MAP) {
    api_instance.create_map(action, store.dispatch);
  }

  return next(action);
}

export default {
  api
};
