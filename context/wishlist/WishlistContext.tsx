import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    wishlist: ICartProduct[];
    numberOfItems: number;

    // Methods
    addProductToWishlist: (product: ICartProduct) => void;
    removeWishlistProduct: (product: ICartProduct) => void;
}

export const WishlistContext = createContext({} as ContextProps);