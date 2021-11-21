import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth'

export const Navbar = () => {


    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth.user)


    const handleLogOut = () => {
        dispatch(startLogOut())
    }
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-4">

                <span className="navbar-brand">{name.toUpperCase()}</span>
                <button
                    className="btn btn-primary ">

                    Profile
                </button>
                <button
                    onClick={handleLogOut}
                    className="btn btn-outline-danger">

                    <i className="fa fa-sign-out-alt"> </i>
                    <span>Salir</span>
                </button>

            </nav>
        </div>
    )
}
