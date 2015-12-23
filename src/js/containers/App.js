import React from 'react';
import { Provider } from 'react-redux';
import Todos from '../components/Todos';

export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          <Todos />
        </Provider>
      </div>
    );
  }
}
