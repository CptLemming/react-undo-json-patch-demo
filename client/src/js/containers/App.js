import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import getRoutes from '../routes';

export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          {getRoutes(this.props.store)}
        </Router>
      </Provider>
    );
  }
}
