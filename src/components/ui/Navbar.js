import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { startLogOut } from '../../actions/auth'

export const Navbar = () => {


    const dispatch = useDispatch()
    const history = useHistory()

    let { name } = useSelector(state => state.auth.user)

    const [navBarName, setNavBarName] = useState('')
    const [link, setLink] = useState('')


    useEffect(() => {
        if (history.location.pathname === '/calendar/calendar-view') {
            setNavBarName('Mi Perfil')
            setLink('/calendar/profile-view')
        } else {
            setNavBarName('Calendar App')
            setLink('/calendar/')


        }

    }, [history.location])

    // name = name.split(' ').map((w) => w = w[0].toUpperCase() + w.slice(1)).join(' ')




    const handleLogOut = () => {
        dispatch(startLogOut())
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark mb-4">


                <span className="navbar-brand "><i className="far fa-user-circle mr-2 icon-navbar"></i> {name}</span>


                <Link className="link-my-profile" to={link}>{navBarName}</Link>


                <button
                    onClick={handleLogOut}
                    className="btn btn-outline-danger">

                    <i className="fa fa-sign-out-alt mr-2"> </i>
                    <span>Salir</span>
                </button>

            </nav>
        </div>
    )
}
