import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { axiosClient } from '../../api';
import { AuthContext } from '../auth';
import { 
    CartContext, 
    cartReducer,
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

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    discount: number;
    total: number;
    shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    shippingAddress: undefined
}

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const { getLoggedUserData, user } = useContext(AuthContext);
    const { status } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    // Get user's cart and address
    useEffect(() => {
        const fetchData = async () => {
            // Get user data from database if logged
            if (user && status === 'authenticated') {
                const loggedUser = await getLoggedUserData();
                const { cart, address } = loggedUser!;

                // Save cart to cookies
                if (cart!.length > 0) {
                    Cookie.set('cart', JSON.stringify(cart), { expires: 30 });
                }

                dispatch({ type: LOAD_ADDRESS, payload: address as ShippingAddress || [] });
            }
    
            // Get user data from cookies
            const cookiesCart = Cookie.get('cart') !== undefined ? JSON.parse(Cookie.get('cart')!) : [];

            // Get items from database
            const cookiesCartItems = await Promise.all(
                cookiesCart.map(async (productId: string) => {
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

            dispatch({ type: LOAD_CART, payload: cookiesCartItems });

            // Get address from cookies
            if (Cookie.get('firstName')) {
                const shippingAddress = {
                    firstName: Cookie.get('firstName') || '',
                    lastName: Cookie.get('lastName') || '',
                    address: Cookie.get('address') || '',
                    address2: Cookie.get('address2') || '',
                    zipCode: Cookie.get('zipCode') || '',
                    city: Cookie.get('city') || '',
                    country: Cookie.get('country') || '',
                    phone: Cookie.get('phone') || ''
                }
        
                dispatch({ type: LOAD_ADDRESS, payload: shippingAddress });
            }
        }

        fetchData();
    }, [getLoggedUserData, status, user, state.isLoaded, enqueueSnackbar]);

    // Update cart state
    useEffect(() => {
        // If user is logged, cart will be saved to database
        const updateCart = async () => {
            if (user && status === 'authenticated') {
                try {
                    const cartFormData = {
                        cart: state.cart.map(product => {
                            return product._id
                        })
                    }

                    await axiosClient.put(`/user/${user._id}`, cartFormData);
                } catch (error) {
                    const err = error as AxiosError;
                    console.log(err);
                    enqueueSnackbar('Ha ocurrido un error al actualizar tu carrito', {
                        variant: 'error',
                        autoHideDuration: 2000,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });
                }
            } 

            const cartItemsIds = state.cart.map(product => product._id) || [];
            Cookie.set('cart', JSON.stringify(cartItemsIds), { expires: 30 });
        }

        updateCart();
    }, [state.cart, enqueueSnackbar, status, user]);

    // Update order summary
    useEffect(() => {
        const numberOfItems = state.cart.length;
        const subtotal = state.cart.reduce((previous, current) => current.price + previous, 0);
        const discount = state.cart.reduce((previous, current) => current.discount + previous, 0);

        const orderSummary = {
            numberOfItems,
            subtotal,
            discount,
            total: subtotal - discount
        }

        dispatch({ type: UPDATE_ORDER_SUMMARY, payload: orderSummary });
    }, [state.cart]);

    const addProductToCart = (product: ICartProduct) => {
        // Verify that user is logged in

        // Check if product exists in cart
        const productInCart = state.cart.some(p => p._id === product._id);
        if (productInCart) {
            // Show alert is product is in cart
            enqueueSnackbar('Este producto ya está en tu carrito de compras', {
                variant: 'warning',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return;
        }

        if (product.isSold) {
            enqueueSnackbar('Este producto ya no está disponible', {
                variant: 'warning',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return;
        }

        dispatch({ type: UPDATE_CART, payload: [...state.cart, product] });

        enqueueSnackbar('¡Agregado a tu carrito de compras!', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: CHANGE_PRODUCT_QUANTITY, payload: product });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: product });

        enqueueSnackbar('¡Removido del carrito!', {
            variant: 'error',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
    }

    const updateAddress = (address: ShippingAddress) => {
        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zipCode', address.zipCode);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);

        dispatch({ type: UPDATE_ADDRESS, payload: address });
    }

    const createCart = async(): Promise<{ hasError: boolean; message: string; }> => {
        const number = '+524774409975';
        const cartItemsIds = state.cart.map(product => product._id) || [];

        try {
            const cartFormData = {
                products: cartItemsIds,
                user: user?._id
            }

            const { data } = await axiosClient.post('/cart', cartFormData);
            const { cart } = data;

            const message = `Hola, me gustaría comprar el siguiente carrito: ${process.env.NEXT_PUBLIC_HOST_NAME}/cart/${cart._id}`;

            enqueueSnackbar('Se ha creado tu carrito.', {
                variant: 'success',
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            redirect_blank(`https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(message)}&app_absent=0`);

            // dispatch({ type: CART_CREATED });

            return { hasError: false, message: 'Se ha enviado tu carrito' };
        } catch (error) {
            const err = error as AxiosError;
            console.log(err);

            enqueueSnackbar('Ha ocurrido un error al crear tu carrito', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return { hasError: true, message: 'Ha ocurrido un error al crear tu carrito' };
        }
    }

    const createOrder = async(): Promise<{ hasError: boolean; message: string; }> => {
        if (!state.shippingAddress) {
            throw new Error("No hay una dirección de envío registrada.");
        }

        // Get products from cookies
        const cookiesCart = JSON.parse(Cookie.get('cart') || '[]');

        // Verify order products are still available
        const databaseCartProducts = await Promise.all(
            cookiesCart.map(async (productId: string) => {
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

        const unavailableProducts = databaseCartProducts?.filter(product => product.isSold);
        if (unavailableProducts && unavailableProducts.length > 0) {
            const unavailableProductsNames = unavailableProducts.map(product => product.title).join(', ');

            enqueueSnackbar(`Lo sentimos, los siguientes productos ya no están disponibles: ${unavailableProductsNames}`, {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });

            return {
                hasError: true,
                message: `Lo sentimos, los siguientes productos ya no están disponibles: ${unavailableProductsNames}`
            }
        }

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subtotal: state.subtotal,
            discount: state.discount,
            total: state.total,
            isPaid: false
        };

        try {
            const { data } = await axiosClient.post('/orders', body);
            
            window.location.href = data.url;
            
            dispatch({ type: ORDER_COMPLETE });
            
            return {
                hasError: false,
                message: data.newOrder._id!.toString()
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as any;
                
                return {
                    hasError: true,
                    message: err.response?.data?.message || "Ocurrió un error al procesar tu pedido. Intenta de nuevo."
                };
            }

            return {
                hasError: true,
                message: "Unknown error, contact administrator."
            };
        }
    }
    
    const showOrderSuccessMessage = () => {
        enqueueSnackbar('¡Tu orden se ha creado con éxito!', {
            variant: 'success',
            autoHideDuration: 2000,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });

        Cookie.remove('cart');

        return;
    };

    function redirect_blank (url: string) {
        var a = document.createElement('a');
        a.target = "_blank";
        a.href = url;
        a.click();
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,
            createOrder,
            createCart,
            showOrderSuccessMessage
        }}>
            { children }
        </CartContext.Provider>
    );
}