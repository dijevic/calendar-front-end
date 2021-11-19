import React from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteEvent } from '../../actions/events'

export const DeleteEventFab = () => {
    const dispatch = useDispatch()

    const handleEventDelete = () => {
        dispatch(startDeleteEvent())
    }
    return (
        <button
            onClick={handleEventDelete}
            className="btn btn-danger fab-danger">

            <i className="fa fa-trash mr-2">

            </i>

            Borrar evento

        </button>
    )
}
