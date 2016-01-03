import React from 'react';
import MapList from '../components/MapList';
import AddMapForm from '../components/AddMapForm';

import AppBar from 'material-ui/lib/app-bar';

class Maps extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar title="Map List" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <AddMapForm />
        <MapList />
      </div>
    );
  }
}

export default Maps;
