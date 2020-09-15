import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk';
import rootReducer from '.';

const enhancer = composeWithDevTools(
  applyMiddleware(thunk),
  persistState(),
);
const store = createStore(rootReducer, {}, enhancer);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
