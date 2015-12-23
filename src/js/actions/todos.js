export const ADD_TODO = 'ADD_TODO';
function add_todo(name) {
  return {
    type: ADD_TODO,
    payload: {
      api: true,
      name
    }
  };
}

export const SELECT_TODO = 'SELECT_TODO';
function select_todo(id) {
  return {
    type: SELECT_TODO,
    payload: {
      id
    }
  };
}

export const UPDATE_TODO = 'UPDATE_TODO';
function update_todo(id, name) {
  return {
    type: UPDATE_TODO,
    payload: {
      api: true,
      id,
      name
    }
  };
}

export const TOGGLE_COMPLETE_TODO = 'TOGGLE_COMPLETE_TODO';
function toggle_complete_todo(id) {
  return {
    type: TOGGLE_COMPLETE_TODO,
    payload: {
      api: true,
      id
    }
  };
}

export const CLEAR_COMPLETED_TODOS = 'CLEAR_COMPLETED_TODOS';
function clear_completed_todos() {
  return {
    type: CLEAR_COMPLETED_TODOS,
    payload: {
      api: true
    }
  };
}

export const UNDO = 'UNDO';
function undo() {
  return {
    type: UNDO,
    payload: {
      api: true
    }
  };
}

export const REDO = 'REDO';
function redo() {
  return {
    type: REDO,
    payload: {
      api: true
    }
  };
}

export default {
  add_todo,
  select_todo,
  update_todo,
  toggle_complete_todo,
  clear_completed_todos,
  undo,
  redo
};
