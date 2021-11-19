import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    uiError: null
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.modalOpen:
            return {
                ...state,
                modalOpen: true
            }
        case types.modalClose:
            return {
                ...state,
                modalOpen: false
            }
        case types.authUiError:
            return {
                ...state,
                uiError: action.payload

            }


        default:
            return state
    }
}