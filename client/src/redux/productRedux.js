// productRedux.js
import axios from 'axios';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';

// Initial State
const initialState = {
  cartItems: [],
};

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === existingItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    default:
      return state;
  }
};

// Action Creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

// Thunk
export const fetchProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
    const product = response.data;
    dispatch(addToCart(product));
  } catch (error) {
    console.error(error);
    // Obsłuż błąd pobierania produktu
  }
};

export default productReducer;