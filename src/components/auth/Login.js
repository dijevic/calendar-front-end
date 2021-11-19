import React, { useEffect, useState } from 'react'
import validator from 'validator'
// import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { UseForm } from '../../hooks/useForm';

import './login.css';
import Swal from 'sweetalert2';
import { Spinner } from '../ui/Loader';

export const Login = () => {



    const dispatch = useDispatch()
    const [tokenEnded, setTokenEnded] = useState(false)
    const { checking } = useSelector(state => state.auth)
    const initialoginState = {
        LoginEmail: '',
        loginPassword: ''
    }
    const initialRegisterState = {
        registerEmail: '',
        registerPassword: '',
        registerPassword2: '',
        registerName: '',
    }

    // variables de Datetoken y manejo del  vencimiento
    // const tokenDate = JSON.parse(localStorage.getItem('tokenDateStart'))
    // const tokenDateEnding = moment(tokenDate).add(2, 'hours')
    // const today = moment().toDate()


    useEffect(() => {

        if (localStorage.getItem('tokenDateStart')) {
            setTokenEnded(true)
            localStorage.clear()
            setTimeout(() => {
                setTokenEnded(false)
            }, 3000);
        }

    }, [])



    const [stateLoginValues, handleLoginChange] = UseForm(initialoginState)
    const [stateRegisterValues, handleRegisterChange] = UseForm(initialRegisterState)

    const { LoginEmail, loginPassword } = stateLoginValues

    const { registerEmail, registerPassword, registerPassword2, registerName } = stateRegisterValues

    const handleLogin = (e) => {
        e.preventDefault()
        // ca hago mi login 
        dispatch(startLogin(LoginEmail, loginPassword))
    }
    const handleRegister = (e) => {
        e.preventDefault()



        if (!validator.isEmail(registerEmail)) {
            return Swal.fire('error', 'email invalido', 'error')
        }

        if (validator.isEmpty(registerPassword) || validator.isEmpty(registerPassword2 || validator.isEmpty(registerName))) {

            return Swal.fire('error', 'campos no pueden estar vacios', 'error')
        }

        if (!validator.equals(registerPassword.toString(), registerPassword2.toString())) {
            return Swal.fire('error', 'las contraseñas deben de ser iguales', 'error')
        }


        // TODO:distpach de registro
        dispatch(startRegister(registerEmail, registerPassword, registerName))




    }

    if (checking) {
        return (<Spinner />)
    }


    return (

        <div className="container login-container">

            {
                tokenEnded && <p className="tokenEndedText">Sesion vencida por falta de actividad</p>
            }
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="LoginEmail"
                                value={LoginEmail}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}