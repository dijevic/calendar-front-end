import React from 'react'
import { AppRouter } from './router/AppRouter'
import '../src/styles/styles.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
export const CalendarApp = () => {

    return (
        <div>
            <Provider store={store}>

                <AppRouter />
            </Provider>
        </div>
    )
}
