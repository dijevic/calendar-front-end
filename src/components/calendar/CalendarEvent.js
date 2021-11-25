import React from 'react'


export const CalendarEvent = ({ event }) => {
    const { usuario, title } = event

    return (
        <div className="eventAnimationEvents" >
            <strong>{title}</strong> <br />
            <span>{usuario.name}</span>
        </div>
    )
}
