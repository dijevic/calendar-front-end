import React from 'react'
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { ProfileView } from '../components/profile/ProfileView';
import { Navbar } from '../components/ui/Navbar';


export const CalendarRouter = () => {
    return (
        <>
            <Navbar />

            <Switch>
                <Route path="/calendar/calendar-view" component={CalendarScreen} />
                <Route path="/calendar/profile-view" component={ProfileView} />

                <Redirect to="/calendar/calendar-view" />
            </Switch>
        </>

    )
}
