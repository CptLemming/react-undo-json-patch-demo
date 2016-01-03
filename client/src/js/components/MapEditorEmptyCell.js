import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapActions from '../actions/map';

import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  };
}

class MapEditorEmptyCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.actions.create_cell(this.props.map.get('id'), this.refs.type.value, this.props.x, this.props.y);
    this.handleClose();
  }

  submitForm() {
    // Trigger 'submit' event on the form programmatically
    const form = this.refs.addCellForm;
    var event = new Event('submit');
    form.dispatchEvent(event);
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.handleClose.bind(this)} />,
      <RaisedButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.submitForm.bind(this)} />,
    ];

    return (
      <div onClick={this.handleOpen.bind(this)}>
        <p>&nbsp;</p>

        <Dialog title="Add cell" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose.bind(this)}>
          <form ref="addCellForm" onSubmit={this.onSubmit.bind(this)}>
            <select name="type" ref="type">
              <option value="tree">Tree</option>
              <option value="grass">Grass</option>
              <option value="rock">Rock</option>
              <option value="water">Water</option>
            </select>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapEditorEmptyCell);