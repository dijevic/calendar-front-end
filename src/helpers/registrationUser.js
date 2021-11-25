// aca verifico si el email existe enviando un email
import Swal from "sweetalert2"
import { fetchWithNotToken } from "./fetch"

export const userRegistration = async (name, email, password, setLoading) => {

    setLoading(true)
    try {
        const resp = await fetchWithNotToken({ name, email, password }, 'POST', 'auth/start-registration')
        const data = await resp.json()

        if (data.ok) {
            setLoading(false)
            Swal.fire(
                'Great!',
                `${data.msg}`,
                'success'
            )

        } else {
            Swal.fire('error', `${data.msg}`, 'error')
            setLoading(false)

        }




    } catch (e) {
        console.log(e)
    }
}
