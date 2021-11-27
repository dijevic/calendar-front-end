import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,


} from "react-router-dom";

import { finishChecking, startChecking } from '../actions/auth';

import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { Spinner } from '../components/ui/Loader';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './publicRoute';

import { AuthRouter } from './authRouter';
import { CalendarRouter } from './CalendarRouter';


export const AppRouter = () => {
    const dispatch = useDispatch()

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
                        path="/auth"
                        component={AuthRouter}
                        isAuth={user}>

                    </PublicRoute>

                    <PrivateRoute
                        path="/calendar"
                        component={CalendarRouter}
                        isAuth={user}>

                    </PrivateRoute>





                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
