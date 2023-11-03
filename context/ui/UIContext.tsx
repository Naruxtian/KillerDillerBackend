import { createContext } from 'react';

interface ContextProps {
    isMenuOpen: boolean;
    isApplicationLoaded: boolean;

    // Methods
    toggleSideMenu: () => void;
    setIsApplicationLoaded: () => void;
}

export const UIContext = createContext({} as ContextProps);