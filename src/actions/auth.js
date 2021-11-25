import Swal from "sweetalert2"
import { fetchWithNotToken, fetchWithRegistrationToken, fetchWithResetToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types"
import { cleanCalendar } from "./events"


export const startLogin = (email, password, setLoading) => {
    return async (dispatch) => {

        setLoading(true)

        try {
            const resp = await fetchWithNotToken({ email, password }, 'POST', 'auth')
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

                Swal.fire('Error en el login :(', 'error en el password o email', 'error')
                setLoading(false)
            }




        } catch (e) {
            console.log(e)
        }
    }
}
export const startRegister = (token, setLoading, history, setRegistrationCompleted) => {
    return async (dispatch) => {
        setLoading(true)

        try {


            const resp = await fetchWithRegistrationToken('POST', 'auth/register', token)
            const data = await resp.json()
            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const usuario = {
                    id: data.userId,
                    name: data.name
                }
                setLoading(false)
                setRegistrationCompleted(true)

                setTimeout(() => {
                    dispatch(login(usuario))

                }, 1000);

            } else {
                setLoading(false)
                // Swal.fire('Error en el registro :(', data.msg, 'error')
                Swal.fire({
                    title: `something goes wrong `,
                    icon: `error`,
                    html: `<i class="fas fa-dizzy iconError"></i>`
                })
                history.replace('/auth')
            }

        } catch (e) {
            console.log(e)
        }
    }
}



export const startChangePassword = (password, token, setLoading, history) => {
    return async (dispatch) => {
        setLoading(true)

        try {
            const resp = await fetchWithResetToken({ password }, 'PUT', 'auth/change-password', token)
            const data = await resp.json()


            if (data.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('tokenDateStart', new Date().getTime())
                const usuario = {
                    id: data.id,
                    name: data.name
                }

                dispatch(login(usuario))
                setLoading(false)

            } else {
                Swal.fire({
                    title: `something goes wrong `,
                    icon: `error`,
                    html: `<i class="fas fa-dizzy iconError"></i>`
                })
                setLoading(false)
                history.replace('/auth')
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






