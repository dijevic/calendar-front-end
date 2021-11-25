import Swal from "sweetalert2";
import moment from 'moment'
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { parseDate } from "../helpers/parseDate";




export const starAddNewEvent = (event) => {

    return async (dispatch, getState) => {

        const { user } = getState().auth;
        try {
            const resp = await fetchWithToken(event, 'POST', 'events')
            const data = await resp.json()

            if (data.ok) {
                event.usuario = user;
                event.uid = data.newEvent.uid;
                dispatch(eventAddNew(event))

            } else {
                Swal.fire('error', `error creando el evento`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}
// eventLoadEvents

export const loadEventsStarter = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken(false, 'GET', 'events')
            const data = await resp.json()


            if (data.ok) {
                const eventsParsed = parseDate(data.eventos)
                dispatch(loadEvents(eventsParsed))

            } else {
                Swal.fire('error', `error creando el evento`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}

export const startEventUpdate = (event) => {

    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(event, 'PUT', `events/${event.uid}`)
            const data = await resp.json()

            if (data.ok) {

                dispatch(eventUpdated(event))

            } else {
                Swal.fire('error', data.msg, 'error')
            }

        } catch (e) {
            console.log(e)
        }

    }
}

export const startDeleteEvent = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().calendar.activeEvent

        try {
            const resp = await fetchWithToken({}, 'DELETE', `events/${uid}`)
            const data = await resp.json()
            if (data.ok) {

                dispatch(eventDeleted())

            } else {
                Swal.fire('error', data.msg, 'error')
            }

        } catch (e) {
            console.log(e)
        }

    }
}

const loadEvents = (events) => ({
    type: types.eventLoadEvents,
    payload: events

})
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})
export const eventSetActive = (event) => ({
    type: types.setActiveEvent,
    payload: event
})

export const unSetActiveEvent = () => ({
    type: types.unSetActiveEvent
})

export const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
})
export const eventDeleted = () => ({
    type: types.eventDelete
})

export const setSelectedSlot = ({ start, end }) => {

    start = moment(start).minutes(0).seconds(0).add(1, 'hours').toDate()
    end = moment(start).minutes(0).seconds(0).add(2, 'hours').toDate()
    return {
        type: types.onselectSlot,
        payload: { start, end }
    }
}
export const unSetSelectedSlot = () => ({
    type: types.unSetOnselectSlot
})

export const cleanCalendar = () => ({ type: types.calendarCleaner })

