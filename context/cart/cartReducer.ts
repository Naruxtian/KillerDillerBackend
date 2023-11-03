import { ICartProduct, ShippingAddress } from '../../interfaces';
import { 
    CartState, 
    CHANGE_PRODUCT_QUANTITY, 
    LOAD_ADDRESS,
    LOAD_CART,
    ORDER_COMPLETE, 
    REMOVE_PRODUCT_FROM_CART, 
    UPDATE_ADDRESS, 
    UPDATE_CART, 
    UPDATE_ORDER_SUMMARY,
    CART_CREATED
} from './';

type CartActionType = 
| { type: typeof LOAD_CART, payload: ICartProduct[] }
| { type: typeof UPDATE_CART, payload: ICartProduct[] }
| { type: typeof CHANGE_PRODUCT_QUANTITY, payload: ICartProduct }
| { type: typeof REMOVE_PRODUCT_FROM_CART, payload: ICartProduct }
| { type: typeof LOAD_ADDRESS, payload: ShippingAddress }
| { type: typeof UPDATE_ADDRESS, payload: ShippingAddress }
| {
    type: typeof UPDATE_ORDER_SUMMARY, 
    payload: {
        numberOfItems: number;
        subtotal: number;
        discount: number;
        total: number;
    }
  }
| { type: typeof ORDER_COMPLETE }
| { type: typeof CART_CREATED }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case LOAD_CART:
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            };
        
        case UPDATE_CART:
            return {
                ...state, 
                cart: [...action.payload]
            }
        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) {
                        return product;
                    }

                    if (product.size !== action.payload.size) {
                        return product;
                    }

                    return action.payload;
                })
            }

        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        
        case UPDATE_ORDER_SUMMARY:
            return {
                ...state,
                ...action.payload
            }

        case LOAD_ADDRESS:
        case UPDATE_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case ORDER_COMPLETE:
        // case CART_CREATED:
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subtotal: 0,
                total: 0
            };
    
        default:
            return state;
    }
}