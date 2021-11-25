import moment from 'moment'

export const parseDate = (events = []) => {

    const eventsParsed = events.map(e => {

        return {
            ...e,
            end: moment(e.end).toDate(),
            start: moment(e.start).toDate()
        }
    })



    return eventsParsed
}