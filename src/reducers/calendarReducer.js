
import { types } from '../types/types'

const initialState = {
    events: [],
    activeEvent: null,
    onSlotSelected: false
}


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.setActiveEvent:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventLoadEvents:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.unSetActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(e => (e.uid === action.payload.uid) ? action.payload : e)
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(e => e.uid !== state.activeEvent.uid),
                activeEvent: null
            }
        case types.onselectSlot:
            return {
                ...state,
                onSlotSelected: action.payload
            }
        case types.unSetOnselectSlot:
            return {
                ...state,
                onSlotSelected: false
            }

        case types.calendarCleaner:
            return initialState

        default:
            return state
    }

}