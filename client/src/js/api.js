import fetch from 'isomorphic-fetch';


class Api {
  constructor(base_url) {
    this.url = base_url;
  }

  get_map_list(action, dispatch) {
    return fetch(this.create_url('maps/'))
      .then(response => response.json())
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

  create_map(action, dispatch) {
    return fetch(this.create_url('maps/'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    })
    .then(response => response.json())
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

  patch_map(id, action, diffs, dispatch) {
    return fetch(this.create_url('maps/'+ id +'/'), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(diffs)
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
