import { types } from "../types/types";

const initialState = {
    checking: true,
    user: false
}


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                user: action.payload

            }
        case types.authUnSetChecking:
            return {
                ...state,
                checking: false,

            }

        case types.authLogOut:
            return {
                checking: false,
                user: false

            }

        default:
            return state;
    }
}