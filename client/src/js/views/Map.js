import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import mapActions from '../actions/map';
import MapEditor from '../components/MapEditor';

import AppBar from 'material-ui/lib/app-bar';

function mapStateToProps(state, props) {
  const selected = state.map.selected.deref();
  const map = state.map.maps.deref().find((item) => item.get('id') == selected);

  return {
    map: map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  };
}

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMapNotFound() {
    return (
      <div>
        <h1>Map Not Found</h1>

        <p>Map with ID {this.props.params.id} does not exist.</p>
        <p><Link to="/">Go back to map list.</Link></p>
      </div>
    );
  }

  render() {
    if (!this.props.map) {
      return this.renderMapNotFound();
    }

    return (
      <div>
        <AppBar title={'Map: '+ this.props.map.get('label')} iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <MapEditor map={this.props.map} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
