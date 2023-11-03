import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { axiosClient } from '../../api';
import { IUser, ShippingAddress } from '../../interfaces';
import { 
    authReducer, 
    AuthContext,
    AUTH_LOGIN,
    UPDATE_USER
 } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user: IUser | undefined
};

type FormData = {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    address?: ShippingAddress;
    tags?: string[];
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { data, status } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      if (status === 'authenticated') {
        dispatch({ type: AUTH_LOGIN, payload: data?.user as IUser });
      }
    }, [status, data]);

    const getLoggedUserData = async() => {
        const userId = state.user?._id;
        if (!userId) {
            return;
        };
        
        const { data } = await axiosClient.get(`/user/${state.user?._id}`);
        const user = data.user as IUser;

        return user;
    }

    const loginUser = async(email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await axiosClient.post('/user/login', { email, password });
            const { token, user } = data;

            Cookies.set('token', token);
            dispatch({ type: AUTH_LOGIN, payload: user });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const registerUser = async(name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await axiosClient.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: AUTH_LOGIN, payload: user });

            return {
                hasError: false
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;

                return {
                    hasError: true,
                    message: err.message
                };
            }

            return {
                hasError: true,
                message: "An error has occurred while creating account. Try again."
            }
        }
    }

    const logout = () => {
        Cookies.remove('cart');
        Cookies.remove('wishlist');

        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zipCode');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');

        signOut({ callbackUrl: window.location.origin });
    }

    const updateUser = async (userId: string, formData: FormData) => {
        try {
            const { data } = await axiosClient.put(`/user/${userId}`, formData);
            
            enqueueSnackbar('¡Tus cambios se han guardado con éxito!', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError;

                return {
                    hasError: true,
                    message: err.message
                };
            }

            return {
                hasError: true,
                message: "Ha ocurrido un error al actualizar tu información. Intenta de nuevo."
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            getLoggedUserData,
            loginUser,
            registerUser,
            logout,
            updateUser
        }}>
            { children }
        </AuthContext.Provider>
    );
};
