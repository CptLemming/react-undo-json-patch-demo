import React from 'react';
import Buttons from '../components/Buttons';
import NewTodo from '../components/NewTodo';
import TodoList from '../components/TodoList';

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
