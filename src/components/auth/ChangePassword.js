import React, { useState } from 'react'
import { UseForm } from '../../hooks/useForm'
import validator from 'validator'
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router'
// import { changePasswordFetch } from '../../helpers/changePasswordFetch'
import { useDispatch } from 'react-redux'
import { startChangePassword } from '../../actions/auth'
import { Spinner } from '../ui/Loader'


export const ChangePassword = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { id: token } = useParams()

    const initialState = {
        password1: '',
        password2: ''

    }
    const [stateValues, handleInputChange] = UseForm(initialState)
    const [loading, setLoading] = useState(false)

    const { password1, password2 } = stateValues

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validator.equals(password1.toString(), password2.toString())) {
            return Swal.fire('error', 'las contraseñas deben de ser iguales', 'error')
        }

        dispatch(startChangePassword(password1, token, setLoading, history))



    }
    if (loading) {
        return (<Spinner />)
    }
    return (
        <div className="container eventAnimation2">
            <div className="centered">
                <div className="col-md-7 login-form-1">
                    <i className="fas fa-user-secret passwordIcon "></i>
                    <p className="mb-3 info-text">ingrese su nueva contraseña</p>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password1"
                                value={password1}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password2"
                                value={password2}
                                onChange={handleInputChange}

                            />
                        </div>


                        <div className="form-group button ">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="enviar" />
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
