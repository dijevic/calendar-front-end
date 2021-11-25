import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogOut } from '../../actions/auth'

export const Navbar = () => {


    const dispatch = useDispatch()
    let { name } = useSelector(state => state.auth.user)

    name = name.split(' ').map((w) => w = w[0].toUpperCase() + w.slice(1)).join(' ')










    const handleLogOut = () => {
        dispatch(startLogOut())
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-4">

                <span className="navbar-brand">{name}</span>

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
