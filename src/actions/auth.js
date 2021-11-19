import Swal from "sweetalert2"
import { fetchWithNotToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"
import { cleanCalendar } from "./events"


export const startLogin = (email, password) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithNotToken({ email, password }, 'POST', 'auth')
            const data = await resp.json()
            console.log(resp)
            console.log(data)
            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const usuario = {
                    id: data.userId,
                    name: data.name
                }
                dispatch(login(usuario))
            } else {
                Swal.fire('Error en el login :(', 'error en el password o email', 'error')
            }




        } catch (e) {
            console.log(e)
        }
    }
}
export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        try {


            const resp = await fetchWithNotToken({ email, password, name }, 'POST', 'auth/register')
            const data = await resp.json()
            if (data.ok) {
                localStorage.setItem('token', data.token)

                localStorage.setItem('tokenDateStart', new Date().getTime())
                const usuario = {
                    id: data.userId,
                    name: data.name
                }
                dispatch(login(usuario))
            } else {
                Swal.fire('Error en el registro :(', data.msg, 'error')
            }




        } catch (e) {
            console.log(e)
        }
    }
}




const login = (usuario) => ({
    type: types.authLogin,
    payload: { ...usuario }
})

export const startChecking = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(false, 'GET', 'auth/renew')
            const data = await resp.json()
            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const usuario = {
                    id: data.userId,
                    name: data.name
                }
                dispatch(login(usuario))

            } else {
                console.log(data)
                dispatch(finishChecking())
                // lanzar mensaje
            }




        } catch (e) {
            console.log(e)
        }
    }
}


export const finishChecking = () => ({ type: types.authUnSetChecking })



export const startLogOut = () => {
    return (dispatch) => {
        localStorage.clear()
        localStorage.removeItem('token')
        dispatch(cleanCalendar())
        dispatch(logOut())
    }

}

const logOut = () => ({ type: types.authLogOut })




