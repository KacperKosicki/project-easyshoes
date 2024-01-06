// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Zmień import na * as thunk

import productReducer from './productRedux'; // Załóżmy, że plik productRedux.js jest w tym samym katalogu

console.log(thunk.de);

// Tworzenie middleware z redux-thunk
const middleware = applyMiddleware(thunk);

// Tworzenie Redux Store z użyciem reducer-a
const store = createStore(productReducer, middleware);

export default store;