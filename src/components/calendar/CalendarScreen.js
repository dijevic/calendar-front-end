import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/messages'
import { CalendarEvent } from './CalendarEvent'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarModal } from './CalendarModal'
import { useDispatch } from 'react-redux'
import { actionOpenModal } from '../../actions/ui'
import { eventSetActive, unSetActiveEvent, setSelectedSlot, loadEventsStarter } from '../../actions/events'
import { AddnewFab } from '../ui/AddnewFab'
import { useSelector } from 'react-redux'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {



    const dispatch = useDispatch()

    const { id } = useSelector(state => state.auth.user)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(loadEventsStarter())
        }
    }, [dispatch])

    const { events } = useSelector(state => state.calendar)
    const { activeEvent } = useSelector(state => state.calendar)


    const [view, setview] = useState(localStorage.getItem('lastView') || 'month')


    const onDoubleClick = (e) => {
        dispatch(actionOpenModal())

    }
    const onViewChange = (e) => {
        setview(e)
        localStorage.setItem('lastView', e)
    }
    const onSelectEvent = (e) => {

        dispatch(eventSetActive(e))

        // console.log(e)
    }
    const onSelectSlot = (e) => {

        dispatch(unSetActiveEvent())
        dispatch(actionOpenModal())
        dispatch(setSelectedSlot(e))
    }
    const eventStyleGetter = (e) => {

        const style = {
            backgroundColor: (id === e.usuario._id || id === e.usuario.id) ? '#367cf7' : '#00112c',
            borderRadius: '0px',
            color: '#fff',
            opacity: '0.8'
        }
        return { style }


    }
    return (
        <div className="calendar-container eventAnimation">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onView={onViewChange}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                view={view}
                onSelectSlot={onSelectSlot}
                selectable={true}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal />

            <AddnewFab />
            {
                activeEvent && <DeleteEventFab />
            }
        </div>
    )
}
