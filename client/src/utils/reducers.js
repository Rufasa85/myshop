import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

export default function reducer(state={
  products:[],
  categories:[],
  currentCategory:"",
  cart:[]
}, action) {
  switch (action.type) {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      }
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, ...action.products]
      }
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
      case UPDATE_CART_QUANTITY:
        let updatedState = state.cart.map(item=>{
          if(item._id !==action._id){
            return item
          }
          const newItem = {...item,purchaseQuantity:action.purchaseQuantity}
          return newItem
        })
        return {
          ...state,
          cartOpen:updatedState.length >0,
          cart:updatedState
        }
        case CLEAR_CART:
          return {
            ...state,
            cartOpen:false,
            cart:[]
          }
        case TOGGLE_CART:
          return {
            ...state,
            cartOpen:!state.cartOpen,
          }
    // if it's none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

// export function useProductReducer(initialState) {
//   return useReducer(reducer, initialState)
// }