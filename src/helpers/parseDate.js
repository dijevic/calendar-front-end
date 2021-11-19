import moment from 'moment'

export const parseDate = (events = []) => {

    return events.map(e => {

        return {
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        }
    })
}