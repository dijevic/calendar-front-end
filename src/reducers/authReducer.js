import { types } from "../types/types";

const initialState = {
    checking: true,
    user: false,
    loading: false,
}


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                loading: false,
                user: action.payload

            }
        case types.authUnSetChecking:
            return {
                ...state,
                checking: false,
                // loading: false

            }

        case types.authLogOut:
            return {
                checking: false,
                user: false,
                loading: false

            }

        case types.authSetLoading:
            return {
                ...state,
                loading: true
            }
        case types.authUnSetLoading:
            return {
                ...state,
                loading: false
            }
        case types.userChangeData:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload
                }

            }


        default:
            return state;
    }
}