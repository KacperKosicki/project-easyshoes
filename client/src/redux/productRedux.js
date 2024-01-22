import axios from 'axios';

// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const SELECT_SIZE = 'SELECT_SIZE';  // Dodaj nowy typ akcji

// Initial State
const initialState = {
  cartItems: [],
  selectedSize: null,  // Dodaj nowy stan dla wybranego rozmiaru
};

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = { ...action.payload, size: state.selectedSize };  // Dodaj wybrany rozmiar do nowego elementu
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

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    case REMOVE_FROM_CART:
      const itemIdToRemove = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== itemIdToRemove),
      };

    case UPDATE_QUANTITY:
      const { itemId, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        ),
      };

    case SELECT_SIZE:  // Obsłuż nowy typ akcji dla wybranego rozmiaru
      return {
        ...state,
        selectedSize: action.payload,
      };

    default:
      return state;
  }
};

// Action Creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const updateQuantity = (data) => ({
  type: UPDATE_QUANTITY,
  payload: data,
});

export const selectSize = (size) => ({  // Dodaj nowego kreatora akcji dla wybranego rozmiaru
  type: SELECT_SIZE,
  payload: size,
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