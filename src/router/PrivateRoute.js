import React from 'react'
import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <>

            <Route {...rest} component={(props) => (

                (isAuth)
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            )
            } />
        </>
    )
}
