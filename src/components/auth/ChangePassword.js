import React, { useState } from 'react'
import { UseForm } from '../../hooks/useForm'
import validator from 'validator'
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router'
// import { changePasswordFetch } from '../../helpers/changePasswordFetch'
import { useDispatch } from 'react-redux'
import { startChangePassword } from '../../actions/auth'
import { Spinner } from '../ui/Loader'
import { SuccessProcess } from './SuccessProcess'
import { Link } from 'react-router-dom'


export const ChangePassword = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { token } = useParams()

    const initialState = {
        password1: '',
        password2: ''

    }
    const [stateValues, handleInputChange] = UseForm(initialState)
    const [loading, setLoading] = useState(false)
    const [processOk, setProcessOk] = useState(false)
    const [showPassword, setshowPassword] = useState(false)

    const handleShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const { password1, password2 } = stateValues

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validator.equals(password1.toString(), password2.toString())) {
            return Swal.fire('error', 'las contraseñas deben de ser iguales', 'error')
        }

        dispatch(startChangePassword(password1, token, setLoading, history, setProcessOk))



    }
    if (loading) {
        return (<Spinner />)
    }

    if (processOk) {
        return (<SuccessProcess message={'Contraseña cambiada con exito!'} />)
    }
    return (
        <div className="container eventAnimation2">
            <div className="centered">
                <div className="col-md-7 login-form-1">
                    <i className="fas fa-user-secret passwordIcon "></i>
                    <p className="mb-3 info-text">ingrese su nueva contraseña</p>
                    <form onSubmit={handleSubmit} >

                        <div className="form-group password-input">
                            <input
                                type={(showPassword) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Contraseña"
                                name="password1"
                                value={password1}
                                onChange={handleInputChange}

                            />
                            <i
                                onClick={handleShowPassword}
                                className={(showPassword) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
                        </div>
                        <div className="form-group password-input">
                            <input
                                type={(showPassword) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Contraseña"
                                name="password2"
                                value={password2}
                                onChange={handleInputChange}

                            />
                            <i
                                onClick={handleShowPassword}
                                className={(showPassword) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
                        </div>


                        <div className="form-group button ">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="enviar" />
                        </div>

                    </form>
                    <Link
                        className="link-forgot-pasword"
                        to="">

                        <i className="fas fa-angle-double-left mr-2"></i>
                        Volver atras</Link>


                </div>
            </div>
        </div>
    )
}
