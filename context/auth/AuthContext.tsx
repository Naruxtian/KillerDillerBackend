import { createContext } from 'react';
import { IUser, ShippingAddress } from '../../interfaces';

type FormData = {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
    address?: ShippingAddress;
    tags?: string[];
}

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    // Methods
    getLoggedUserData: () => Promise<IUser | undefined>;
    loginUser: (email: string, password: string) => Promise<boolean>
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>
    logout: () => void
    updateUser: (userId: string, formData: FormData) => Promise<any>;
}

export const AuthContext = createContext({} as ContextProps);