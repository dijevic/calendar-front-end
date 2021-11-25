import React, { useState } from 'react'
import { UseForm } from '../../hooks/useForm'
import validator from 'validator'
import { fetchForgotPassword } from '../../helpers/forgotPasswordFetch'
import Swal from 'sweetalert2'
import { Spinner } from '../ui/Loader'
import { useHistory } from 'react-router'


export const ForgotPassword = () => {

    const history = useHistory()

    const initialState = {
        email: ''

    }

    const [stateValues, handleInputChange, resetState] = UseForm(initialState)

    const [loading, setLoading] = useState(false)

    const { email } = stateValues


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validator.isEmail(email)) {
            return Swal.fire('error', 'email invalido', 'error')
        }


        fetchForgotPassword(email.toLowerCase(), setLoading, history)
        resetState()


    }

    if (loading) {
        return (<Spinner />)
    }
    return (
        <div className="container eventAnimation2 ">
            <div className="centered">

                <div className="col-md-7 login-form-1">
                    <i className="far fa-envelope emailIcon"></i>
                    <p className="mb-3 info-text">ingrese su email para recuperar su cuenta</p>
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={email}
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
