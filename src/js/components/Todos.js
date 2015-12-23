import React from 'react';
import Buttons from './Buttons';
import NewTodo from './NewTodo';
import TodoList from './TodoList';

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <Buttons />
        <TodoList />
        <NewTodo />
      </div>
    );
  }
}

export default Todos;
