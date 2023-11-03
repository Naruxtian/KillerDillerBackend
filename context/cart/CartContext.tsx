import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    discount: number;
    total: number;
    shippingAddress?: ShippingAddress;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
    createOrder: () => Promise<{ hasError: boolean; message: string; }>
    createCart: () => Promise<{ hasError: boolean; message: string; }>
    showOrderSuccessMessage: () => void;
}

export const CartContext = createContext({} as ContextProps);