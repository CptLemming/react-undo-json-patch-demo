import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import todoActions from '../actions/todos';

function mapStateToProps(state) {
  return {
    todos: state.todos.todos.deref()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li><button type="button" onClick={this.props.actions.undo.bind(this)}>Undo</button></li>
        <li><button type="button" onClick={this.props.actions.redo.bind(this)}>Redo</button></li>
        <li><button type="button" onClick={this.props.actions.clear_completed_todos.bind(this)}>Clear</button></li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
