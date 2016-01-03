import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapListItem from './MapListItem';
import mapActions from '../actions/map';

import List from 'material-ui/lib/lists/list';

function mapStateToProps(state) {
  return {
    maps: state.map.maps.deref()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  };
}

class MapList extends React.Component {
  constructor(props) {
    super(props);
  }

  onCompleteChange(id) {
    this.props.actions.toggle_complete_todo(id);
  }

  render() {
    return (
      <List>
        {this.props.maps.map((map, i) => {
          return <MapListItem key={i} map={map} isLastItem={i+1 >= this.props.maps.size}/>;
        })}
      </List>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapList);
