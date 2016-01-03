import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { api } from './middleware';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(
    api,
    thunk
  );

  const createStoreWithMiddleware = compose(middleware);
  return createStoreWithMiddleware(createStore)(rootReducer, initialState);
}
