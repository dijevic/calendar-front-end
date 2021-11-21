import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../ui/Loader'

export const CalendarEvent = ({ event }) => {
    const { usuario, title } = event
    const { loading } = useSelector(state => state.calendar)
    console.log(loading)

    if (loading) {
        return <Spinner height={20} width={20} />
    }
    return (
        <div>
            <strong>{title}</strong> <br />
            <span>{usuario.name}</span>
        </div>
    )
}
