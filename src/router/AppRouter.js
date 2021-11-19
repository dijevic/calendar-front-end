import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,

} from "react-router-dom";

import { finishChecking, startChecking } from '../actions/auth';
import { Login } from "../components/auth/Login";

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { Spinner } from '../components/ui/Loader';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './publicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch()

    console.log(process.env)
    const { checking, user } = useSelector(state => state.auth)


    useEffect(() => {

        // error cuando estoy en el login sino coloco este if me deja entrar de n uevo
        if (localStorage.getItem('token')) {

            dispatch(startChecking())

        } else {
            dispatch(finishChecking())

        }


    }, [dispatch])

    if (checking) {
        return (<Spinner />)
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/login"
                        exact
                        component={Login}
                        isAuth={user}>

                    </PublicRoute>

                    <PrivateRoute
                        path="/"
                        exact
                        component={CalendarScreen}
                        isAuth={user}>

                    </PrivateRoute>

                    <Redirect to="/login" />


                </Switch>
            </div>
        </Router>
    )
}
