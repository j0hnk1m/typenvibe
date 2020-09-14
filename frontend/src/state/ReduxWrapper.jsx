import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import storeSynchronize from 'redux-localstore';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '.';

const enhancer = compose(
  composeWithDevTools(applyMiddleware(thunk)),
);
const store = createStore(rootReducer, {}, enhancer);
storeSynchronize(store);

export default ({ element }) => (
  <Provider store={store}>
    {element}
  </Provider>
);
