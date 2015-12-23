import React from 'react';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <h2>{this.props.todo.get('name')}</h2>
        <input type="checkbox" name="complete" onChange={this.props.onCompleteChange.bind(this)} checked={this.props.todo.get('complete')} />
      </form>
    );
  }
}

export default TodoListItem;
