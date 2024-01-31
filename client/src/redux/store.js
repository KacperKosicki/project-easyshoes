// store.js

// Importy komponentów i stylów
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import productReducer from './productRedux';

console.log(thunk.de);

// Tworzenie middleware z redux-thunk
const middleware = applyMiddleware(thunk);

// Tworzenie Redux Store z użyciem reducer-a
const store = createStore(productReducer, middleware);

export default store;