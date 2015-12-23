import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import todoActions from '../actions/todos';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  };
}

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    e.preventDefault();

    const node = this.refs.name;
    let value = node.value;

    this.props.actions.add_todo(value);
    node.value = "";
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" name="name" ref="name" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(NewTodo);
