import React from 'react'
import { useDispatch } from 'react-redux'
import { actionOpenModal } from '../../actions/ui'

export const AddnewFab = () => {
    const dispatch = useDispatch()
    const handleNewEvent = () => {
        dispatch(actionOpenModal())
    }
    return (
        <button
            className="btn btn-primary fab"
            onClick={handleNewEvent}
        >
            <i className="fa fa-plus"></i>
        </button>
    )
}
