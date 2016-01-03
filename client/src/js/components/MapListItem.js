import React from 'react';
import { Link } from 'react-router';

import FontIcon from 'material-ui/lib/font-icon';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

class MapListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ListItem
          linkButton
          primaryText={this.props.map.get('label')}
          secondaryText={<p>{this.props.map.get('height')} x {this.props.map.get('width')}</p>}
          containerElement={<Link to={`/${this.props.map.get('id')}`}/>}
          leftIcon={<FontIcon className="material-icons">layers</FontIcon>}
        />
        {this.props.isLastItem ? '' : <Divider inset={true}/>}
      </div>
    );
  }
}

export default MapListItem;
