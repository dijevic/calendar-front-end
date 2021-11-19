import React, { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { actionCloseModal } from '../../actions/ui';
import { starAddNewEvent, startEventUpdate, unSetActiveEvent, unSetSelectedSlot } from '../../actions/events';


let startDateDefault = moment().minutes(0).seconds(0).add(1, 'hours').toDate()
let endDateDefault = moment().minutes(0).seconds(0).add(2, 'hours').toDate()
const today = moment().toDate()


const initialStateForm = {
    title: '',
    notes: '',
    start: startDateDefault,
    end: endDateDefault
}

export const CalendarModalEvent = () => {




    const { activeEvent, onSlotSelected } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const { start: startOnSelected, end: endOnSelected } = onSlotSelected


    const [startDate, setstartDate] = useState(startDateDefault)
    const [endDate, setEndDate] = useState(endDateDefault)
    const [titleValid, setTitleValid] = useState(true)
    const [validDate, setValidDate] = useState(true)

    const [formValues, setFormValues] = useState(initialStateForm)


    // uso el efecto para setear a mi form y a mi fecha los valores correspondientes

    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent)
            setstartDate(activeEvent.start)
            setEndDate(activeEvent.end)

        } else {
            setFormValues(initialStateForm)
            setstartDate(startDateDefault)
            setEndDate(endDateDefault)

        }
        if (startOnSelected) {
            setstartDate(startOnSelected)
            setEndDate(endOnSelected)

            setFormValues((e) => {
                return {
                    ...e,
                    start: startOnSelected,
                    end: endOnSelected
                }
            })

        } else if (!activeEvent && !onSlotSelected) {
            setFormValues(initialStateForm)
            setstartDate(startDateDefault)
            setEndDate(endDateDefault)
        }


    }, [activeEvent, startOnSelected, endOnSelected, onSlotSelected])




    const { title, notes, start, end } = formValues


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleStartDateChange = (e) => {

        setstartDate(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handleEndDateChange = (e) => {
        setEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const startDateMoment = moment(start)
        const endDateMoment = moment(end)

        if (startDateMoment.isSameOrAfter(endDateMoment)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'the date of starting and finishing must be diferent',

            })
        }




        if (title.length <= 2) {
            return setTitleValid(false)
        }
        if (startDateMoment.isBefore(today)) {

            return setValidDate(false)
        }


        setTitleValid(true)
        setValidDate(true)
        setFormValues(initialStateForm)

        dispatch(actionCloseModal())
        dispatch(unSetSelectedSlot())
        dispatch(unSetActiveEvent())

        if (activeEvent) {
            dispatch(startEventUpdate(formValues))
        } else {
            dispatch(starAddNewEvent(formValues))
        }
    }


    return (
        <div>
            <h1>{(!activeEvent) ? `Nuevo evento` : `Editar evento`}</h1>
            <hr />
            <form onSubmit={handleFormSubmit} className="container ">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={startDate}
                        className={`form-control ${!validDate && 'is-invalid'} `}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={startDate}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </div>
    )
}
