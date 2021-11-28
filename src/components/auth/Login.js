import React, { useEffect, useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { UseForm } from '../../hooks/useForm';

import './login.css';
import Swal from 'sweetalert2';
import { Spinner } from '../ui/Loader';
import { Link } from 'react-router-dom';
import { userRegistration } from '../../helpers/registrationUser';


export const Login = () => {



    const dispatch = useDispatch()
    const [tokenEnded, setTokenEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showPasswordLogin, setshowPasswordLogin] = useState(false)
    const [showPasswordRegister, setshowPasswordRegister] = useState(false)
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




    useEffect(() => {

        if (localStorage.getItem('tokenDateStart')) {
            setTokenEnded(true)
            localStorage.clear()
            setTimeout(() => {
                setTokenEnded(false)
            }, 3000);
        }

    }, [])



    const [stateLoginValues, handleLoginChange, resetLogin] = UseForm(initialoginState)
    const [stateRegisterValues, handleRegisterChange, resetRegister] = UseForm(initialRegisterState)

    const { LoginEmail, loginPassword } = stateLoginValues

    const { registerEmail, registerPassword, registerPassword2, registerName } = stateRegisterValues

    const handleLogin = (e) => {
        e.preventDefault()
        // ca hago mi login 
        dispatch(startLogin(LoginEmail.toLowerCase(), loginPassword, setLoading))
        resetLogin()
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
        // dispatch(startRegister(registerEmail, registerPassword, registerName))

        userRegistration(registerName, registerEmail, registerPassword, setLoading)
        resetRegister()

    }

    const handleShowPassword = () => {
        setshowPasswordLogin(!showPasswordLogin)
    }
    const handleShowPasswordRegister = () => {
        setshowPasswordRegister(!showPasswordRegister)
    }
    if (loading) {
        return (<Spinner />)
    }




    return (

        <div className="container login-container  ">
            {
                tokenEnded && <p className="tokenEndedText">Sesion vencida por falta de actividad</p>
            }

            <div className="row">
                <div className="col-md-6 login-form-1 ">
                    <h3>Ingreso</h3>

                    <i className="far fa-user-circle userIcon "></i>
                    <form onSubmit={handleLogin} >

                        <div className="form-group ">

                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="LoginEmail"
                                autoComplete="off"
                                value={LoginEmail}
                                onChange={handleLoginChange}

                            />

                        </div>
                        <div className="form-group password-input">
                            <input
                                type={(showPasswordLogin) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginChange}
                            />
                            <i
                                onClick={handleShowPassword}
                                className={(showPasswordLogin) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />

                        </div>
                    </form>
                    <Link className="link-forgot-pasword" to="/auth/forgot-password">Olvide mi contraseña</Link>

                </div>

                <div className="col-md-6 login-form-2 ">
                    <h3>Registro</h3>
                    <i className="fas fa-id-card userRegisterIcon"></i>
                    <form onSubmit={handleRegister} >
                        <div className="form-group ">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                autoComplete="off"
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
                                autoComplete="off"
                                value={registerEmail}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group password-input">
                            <input
                                type={(showPasswordRegister) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterChange}
                            />
                            <i
                                onClick={handleShowPasswordRegister}
                                className={(showPasswordRegister) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
                        </div>

                        <div className="form-group password-input">
                            <input
                                type={(showPasswordRegister) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterChange}
                            />
                            <i
                                onClick={handleShowPasswordRegister}
                                className={(showPasswordRegister) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
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