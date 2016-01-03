import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapActions from '../actions/map';
import MapEditorEmptyCell from './MapEditorEmptyCell';
import MapEditorCell from './MapEditorCell';

import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import FontIcon from 'material-ui/lib/font-icon';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  };
}

class MapEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = [];
    let headers = [<th key={0}>&nbsp;</th>];

    for (var h=1; h <= this.props.map.get('width'); h++) {
      headers.push(<th key={h}><b>{h}</b></th>)
    }

    for (var i=0; i < this.props.map.get('height'); i++) {
      let cells = [<td key={0}><b>{i+1}</b></td>];

      for (var j=0; j < this.props.map.get('width'); j++) {
        let cell = this.props.map.get('cells').find((item) => {
          return item.get('position_y') == i && item.get('position_x') == j;
        });

        if (cell) {
          cells.push(<td key={j+1} className={cell.get('type')}><MapEditorCell map={this.props.map} cell={cell}  x={j} y={i} /></td>);
        } else {
          cells.push(<td key={j+1} className="blank"><MapEditorEmptyCell map={this.props.map} x={j} y={i} /></td>);
        }
      }

      rows.push(<tr key={i+1}>{cells}</tr>);
    }

    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <RaisedButton onClick={this.props.actions.undo.bind(this)} label="Undo" labelPosition="after" primary={true}>
              <FontIcon className="material-icons">undo</FontIcon>
            </RaisedButton>
            <RaisedButton onClick={this.props.actions.redo.bind(this)} label="Redo" labelPosition="after" primary={true}>
              <FontIcon className="material-icons">redo</FontIcon>
            </RaisedButton>
          </ToolbarGroup>
        </Toolbar>
        <table className="editor-table">
          <thead>
            <tr key={0}>{headers}</tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapEditor);
