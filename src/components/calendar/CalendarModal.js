import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { unSetActiveEvent, unSetSelectedSlot } from '../../actions/events';
import { actionCloseModal } from '../../actions/ui';

import { CalendarModalEvent } from './CalendarModalEvent'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
    const { modalOpen } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(actionCloseModal())
        dispatch(unSetActiveEvent())
        dispatch(unSetSelectedSlot())

    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className="modal"
                closeTimeoutMS={200}
                overlayClassName="modal-fondo"
            >
                <CalendarModalEvent />
            </Modal>
        </div>
    )
}
