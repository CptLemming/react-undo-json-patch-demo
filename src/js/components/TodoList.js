import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
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

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  onCompleteChange(id) {
    this.props.actions.toggle_complete_todo(id);
  }

  render() {
    return (
      <ul>
        {this.props.todos.map((todo, i) => {
          return <li key={i}><TodoListItem todo={todo} onCompleteChange={this.onCompleteChange.bind(this, todo.id)} /></li>;
        })}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
