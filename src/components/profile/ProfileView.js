import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startChangingUserData } from '../../actions/auth'
import { UseForm } from '../../hooks/useForm'
import { Spinner } from '../ui/Loader'
import Swal from 'sweetalert2'

export const ProfileView = () => {

    let { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const initialState = {
        name: user.name,
        password: ''
    }

    const [stateValues, handleInputChange, reset] = UseForm(initialState)
    const [loading, setLoading] = useState(false)
    const [showPassword, setshowPassword] = useState(false)


    const { name, password } = stateValues
    const handleChangeInformation = (e) => {
        e.preventDefault()
        if (validator.isEmpty(name.trim())) {
            reset()
            return Swal.fire('error', 'el nombre no puede estar vacio', 'error')
        }

        dispatch(startChangingUserData(stateValues, setLoading))



    }

    const handleShowPassword = () => {
        setshowPassword(!showPassword)
    }


    if (loading) {
        return (<Spinner />)
    }




    return (
        <div className="container login-container eventAnimation4 ">

            <div className="row justify-content-center">
                <div className="col-md-6 login-form-1 ">
                    <h3>Mi informacion</h3>

                    <i className="fas fa-user-cog userIcon "></i>
                    <form onSubmit={handleChangeInformation}>
                        <div className="form-group ">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                autoComplete="off"
                                value={name}
                                onChange={handleInputChange}


                            />

                        </div>
                        <div className="form-group password-input">
                            <input
                                type={(showPassword) ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}


                            />
                            <i
                                onClick={handleShowPassword}
                                className={(showPassword) ? 'fas fa-eye-slash' : 'far fa-eye'}>

                            </i>
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="guardar"
                            />
                        </div>
                    </form>

                    <Link
                        className="link-forgot-pasword"
                        to="">

                        <i className="fas fa-angle-double-left mr-2"></i>
                        Volver atras
                    </Link>




                </div>


            </div>
        </div>
    )
}
