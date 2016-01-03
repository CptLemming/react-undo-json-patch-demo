export const FETCH_MAPS = 'FETCH_MAPS'
const fetch_maps = () => {
  return {
    type: FETCH_MAPS
  }
}

export const SELECT_MAP = 'SELECT_MAP'
const select_map = (id) => {
  return {
    type: SELECT_MAP,
    payload: {
      id
    }
  }
}

export const CREATE_MAP = 'CREATE_MAP'
const create_map = (label, height, width) => {
  return {
    type: CREATE_MAP,
    payload: {
      label,
      height,
      width
    }
  }
}

export const DELETE_MAP = 'DELETE_MAP'
const delete_map = (id) => {
  return {
    type: DELETE_MAP,
    payload: {
      id
    }
  }
}

export const UPDATE_MAP = 'UPDATE_MAP'
const update_map = (id, label, height, width) => {
  return {
    type: UPDATE_MAP,
    payload: {
      id,
      label,
      height,
      width
    }
  }
}

export const CREATE_CELL = 'CREATE_CELL'
const create_cell = (map_id, type, position_x, position_y) => {
  return {
    type: CREATE_CELL,
    patch: true,
    payload: {
      map_id,
      type,
      position_x,
      position_y
    }
  }
}

export const UPDATE_CELL = 'UPDATE_CELL'
const update_cell = (id, map_id, type, position_x, position_y) => {
  return {
    type: UPDATE_CELL,
    patch: true,
    payload: {
      id,
      map_id,
      type,
      position_x,
      position_y
    }
  }
}

export const UNDO = 'UNDO'
function undo() {
  return {
    type: UNDO,
    patch: true
  }
}

export const REDO = 'REDO'
function redo() {
  return {
    type: REDO,
    patch: true
  }
}

export default {
  fetch_maps,
  select_map,
  create_map,
  delete_map,
  update_map,
  create_cell,
  update_cell,
  undo,
  redo
}
