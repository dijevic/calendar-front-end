import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { ChangePassword } from '../components/auth/ChangePassword';
import { FinishRegistration } from '../components/auth/FinishRegistration';
import { ForgotPassword } from '../components/auth/ForgotPassword';
import { Login } from '../components/auth/Login';



export const AuthRouter = () => {
    return (

        <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/forgot-password" component={ForgotPassword} />
            <Route path="/auth/change-password/:id" component={ChangePassword} />
            <Route path="/auth/finish-registration/:token" component={FinishRegistration} />
            <Redirect exact to="/auth/login" />
        </Switch>

    )
}