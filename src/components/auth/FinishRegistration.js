import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { startRegister } from '../../actions/auth'
import { Spinner } from '../ui/Loader'
import { SuccessProcess } from './SuccessProcess'

export const FinishRegistration = () => {

    const { token } = useParams()

    const dispatch = useDispatch()
    const history = useHistory()


    const [loading, setLoading] = useState(false)
    const [registrationCompleted, setRegistrationCompleted] = useState(false)
    const handleRegister = () => {
        dispatch(startRegister(token, setLoading, history, setRegistrationCompleted))


    }

    if (loading) {
        return (<Spinner />)
    }

    if (registrationCompleted) {
        return (<SuccessProcess message={'Email verificado !'} />)
    }

    return (
        <div className="welcomeScreen">
            <h1 onClick={handleRegister} className="welcome__text">welcome !</h1>

            <p className="mr-2">
                Please click the following link to finish your registration
                <i className="far fa-hand-point-right"></i>

            </p>
            <button
                onClick={handleRegister}
                className="btn btn-primary">
                Verify Email
            </button>

        </div>
    )
}
