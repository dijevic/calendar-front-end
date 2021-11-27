import React from 'react'

export const SuccessProcess = ({ message }) => {
    return (
        <div className="registerSuccess">
            <i className="fas fa-user-check"></i>
            <p className="successRegistrationText">{message}</p>
        </div>
    )
}
