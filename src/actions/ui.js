import { types } from "../types/types"

export const actionOpenModal = () => {
    return {
        type: types.modalOpen
    }
}
export const actionCloseModal = () => {
    return {
        type: types.modalClose
    }
}

export const actionSetError = (msg) => ({
    type: types.authUiError,
    payload: msg
})

