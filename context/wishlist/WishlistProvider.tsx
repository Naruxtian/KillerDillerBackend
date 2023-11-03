import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import Cookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../auth';
import { ICartProduct } from '../../interfaces';
import { 
    WishlistContext, 
    wishlistReducer,
    LOAD_WISHLIST, 
    REMOVE_PRODUCT_FROM_WISHLIST, 
    UPDATE_WISHLIST
} from './';
import { axiosClient } from '../../api';
import { AxiosError } from 'axios';

export interface WishlistState {
    isLoaded: boolean;
    wishlist: ICartProduct[];
    numberOfItems: number;
}

const WISHLIST_INITIAL_STATE: WishlistState = {
    isLoaded: false,
    wishlist: [],
    numberOfItems: 0
}

export const WishlistProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(wishlistReducer, WISHLIST_INITIAL_STATE);
    const { getLoggedUserData, user } = useContext(AuthContext);
    const { status } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async() => {
            if (user && status === 'authenticated') {
                // Load data from database
                const loggedUser = await getLoggedUserData();
                const { wishlist } = loggedUser!;

                // Save wishlist to cookies
                if (wishlist?.length! > 0) {
                    Cookie.set('wishlist', JSON.stringify(wishlist), { expires: 30 });
                }
            }

            // Get saved wishlist from cookies
            const cookiesWishlist = Cookie.get('wishlist') !== undefined ? JSON.parse(Cookie.get('wishlist')!) : [];
                
            // Get items from database
            const cookiesWishlistItems = await Promise.all(
                cookiesWishlist.map(async (productId: string) => {
                    try {
                        const { data: product } = await axiosClient.get(`/products/${productId}`);
                            product.image = product.images![0];
                            delete product.images;
                
                            return product;
                    } catch (error) {
                        const err = error as AxiosError;
                        console.log(err);
                        enqueueSnackbar('Ocurrió un error al obtener tu carrito de compras', {
                            variant: 'error',
                            autoHideDuration: 2000,
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }
                        });
                    }
                })
            );

            dispatch({ type: LOAD_WISHLIST, payload: cookiesWishlistItems || [] });
        }

        fetchData();
    }, [enqueueSnackbar, getLoggedUserData, status, user]);

    useEffect(() => {
        const updateWishlist = async() => {
            if (user && status === 'authenticated') {
                try {
                    const formData = {
                        wishlist: state.wishlist.map(product => {
                            return product._id
                        })
                    };
        
                    await axiosClient.put(`/user/${user._id}`, formData);
                } catch (error) {
                    const err = error as AxiosError;
                    console.log(err);
                    enqueueSnackbar('Ha ocurrido un error al actualizar tu lista de deseos', {
                        variant: 'error',
                        autoHideDuration: 2000,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });
                }
            }

            const wishlistItemsIds = state.wishlist.map(product => product._id);
            Cookie.set('wishlist', JSON.stringify(wishlistItemsIds), { expires: 30 });
        }

        updateWishlist();
    }, [enqueueSnackbar, state.wishlist, status, user]);

    const addProductToWishlist = (product: ICartProduct): void => {
        // Verify that user is logged in

        // Check if product exists in wishlist
        const productInWishlist = state.wishlist.some(p => p._id === product._id);
        if (productInWishlist) {
            // Show alert if product exists in wishlist
            enqueueSnackbar('Este producto ya está en tu lista de deseos', {
                variant: 'warning',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return;
        }

        dispatch({ type: UPDATE_WISHLIST, payload: [...state.wishlist, product] });

        enqueueSnackbar('¡Agregado a tu lista de deseos!', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
    }

    const removeWishlistProduct = (product: ICartProduct) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_WISHLIST, payload: product });

        enqueueSnackbar('¡Removido de tu lista de deseos!', {
            variant: 'error',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
    }

    return (
        <WishlistContext.Provider value={{
            ...state,

            // Methods
            addProductToWishlist,
            removeWishlistProduct
        }}>
            { children }
        </WishlistContext.Provider>
    );
}