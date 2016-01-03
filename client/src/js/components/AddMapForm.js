import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapActions from '../actions/map';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mapActions, dispatch)
  };
}

class AddMapForm extends React.Component {
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

    const form = this.refs.addMapForm;
    const label = form.elements['label'];
    const height = form.elements['height'];
    const width = form.elements['width'];

    this.props.actions.create_map(label.value, height.value, width.value);
    this.handleClose();
    form.reset();
  }

  submitForm() {
    // Trigger 'submit' event on the form programmatically
    const form = this.refs.addMapForm;
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
      <div>
        <FloatingActionButton mini={true} onClick={this.handleOpen.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>

        <Dialog title="Add Map" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose.bind(this)}>
          <form ref="addMapForm" onSubmit={this.onSubmit.bind(this)}>
            <TextField hintText="Label" floatingLabelText="Label" type="text" name="label" />
            <TextField hintText="Height" floatingLabelText="Height" type="number" name="height" defaultValue={0} />
            <TextField hintText="Width" floatingLabelText="Width" type="number" name="width" defaultValue={0} />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMapForm);
