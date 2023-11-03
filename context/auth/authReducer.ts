import { IUser } from '../../interfaces';
import { 
    AuthState,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    UPDATE_USER   
} from './';

type AuthActionType = 
| { type: typeof AUTH_LOGIN, payload: IUser }
| { type: typeof AUTH_LOGOUT }
| { type: typeof UPDATE_USER, payload: IUser }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }
    
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}