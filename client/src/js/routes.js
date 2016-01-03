import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/App';
import Maps from './views/Maps';
import Map from './views/Map';
import mapActions from './actions/map';

const getRoutes = ({ dispatch, getState }) => {
  function loadMaps(nextState, replaceState) {
    dispatch(mapActions.fetch_maps());
  }

  function selectMap(nextState, replaceState) {
    dispatch(mapActions.select_map(nextState.params.id));

    return loadMaps(nextState, replaceState);
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Maps} onEnter={loadMaps}/>
      <Route path=":id" component={Map} onEnter={selectMap}/>
    </Route>
  );
}

export default getRoutes;
