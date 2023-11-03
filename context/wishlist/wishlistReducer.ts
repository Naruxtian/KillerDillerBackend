import { ICartProduct } from '../../interfaces';
import {    
    WishlistState,
    LOAD_WISHLIST,
    UPDATE_WISHLIST,
    REMOVE_PRODUCT_FROM_WISHLIST,
} from './';

type CartActionType = 
| { type: typeof LOAD_WISHLIST, payload: ICartProduct[] }
| { type: typeof UPDATE_WISHLIST, payload: ICartProduct[] }
| { type: typeof REMOVE_PRODUCT_FROM_WISHLIST, payload: ICartProduct }


export const wishlistReducer = (state: WishlistState, action: CartActionType): WishlistState => {
    switch (action.type) {
        case LOAD_WISHLIST:
            return {
                ...state,
                isLoaded: true,
                wishlist: [...action.payload],
                numberOfItems: action.payload.length
            };

        case UPDATE_WISHLIST:
            return {
                ...state, 
                wishlist: [...action.payload],
                numberOfItems: action.payload.length
            }

        case REMOVE_PRODUCT_FROM_WISHLIST:
            return {
                ...state,
                wishlist: state.wishlist.filter(product => 
                    !(product._id === action.payload._id && product.size === action.payload.size)),
                numberOfItems: state.numberOfItems - 1
            }

        default:
            return state;
    }
}