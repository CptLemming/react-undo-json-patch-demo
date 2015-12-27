import fetch from 'isomorphic-fetch';


class Api {
  constructor(base_url) {
    this.url = base_url;
  }

  handle_action(action, diffs, dispatch) {
    if (!action.payload || !action.payload.api) {
      // Only handle API actions
      return;
    }

    return fetch(this.create_url('todos'), {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        diffs
      })
    })
    // .then(response => response.json())
    .then(json => {
      const success = {
        type: action.type + '_SUCCESS',
        payload: {
          data: json
        }
      };
      return dispatch(success);
    })
    .catch(err => {
      const error = {
        type: action.type + '_ERROR',
        payload: {
          error: err,
        }
      };
      return dispatch(error);
    });
  }

  create_url(url) {
    return this.url + url;
  }
}

export default Api;
