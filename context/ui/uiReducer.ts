import { UIState } from './UIProvider';
import { TOGGLE_SIDE_MENU, APPLICATION_LOADED } from './';

type UIActionType = 
| { type: string }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case TOGGLE_SIDE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            };
        case APPLICATION_LOADED:
            return {
                ...state,
                isApplicationLoaded: true
            };
        default:
            return state;
    }
};