import React, { PropsWithChildren, useReducer } from 'react';
import { TOGGLE_SIDE_MENU, APPLICATION_LOADED } from './';
import { UIContext, uiReducer } from './';

export interface UIState {
    isMenuOpen: boolean;
    isApplicationLoaded: boolean;
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false,
    isApplicationLoaded: false
}

export const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: TOGGLE_SIDE_MENU });
    }

    const setIsApplicationLoaded = () => {
        dispatch({ type: APPLICATION_LOADED });
    }

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
            setIsApplicationLoaded
        }}>
            { children }
        </UIContext.Provider>
    );
}