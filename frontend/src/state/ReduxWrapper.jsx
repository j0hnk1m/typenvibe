import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '.';

const enhancer = compose(
  composeWithDevTools(applyMiddleware(thunk)),
  persistState(),
);
const store = createStore(rootReducer, {}, enhancer);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
