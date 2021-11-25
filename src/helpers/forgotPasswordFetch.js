import Swal from "sweetalert2"
import { fetchWithNotToken } from "./fetch"

export const fetchForgotPassword = async (email, setLoading, history) => {

    setLoading(true)
    try {
        const resp = await fetchWithNotToken({ email }, 'PUT', 'auth/forgot-password')
        const data = await resp.json()

        if (data.ok) {

            Swal.fire(
                'Great!',
                `${data.msg}`,
                'success'
            )
            setLoading(false)
            history.replace('/auth')

        } else {
            Swal.fire('success', `${data.msg}`, 'success')
            setLoading(false)



        }




    } catch (e) {
        console.log(e)
    }
}
