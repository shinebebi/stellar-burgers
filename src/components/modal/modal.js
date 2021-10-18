import React from "react";
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from "react-dom"
<<<<<<< HEAD


function ModalOverlay () {
    return (
        <div className={modalStyles.modal__overlay}/>
    )
}
=======
import ModalOverlay from "../modal-overlay/modal-overlay"
import PropTypes from "prop-types";
>>>>>>> main


function Modal (props) {
    const popupRef = React.useRef()
    const escFunction = React.useCallback((event) => {
        if(event.keyCode === 27) {
            props.onClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const outsideHandler = (event) => {
        if (!popupRef.current.contains(event.target)) {
            props.onClose()
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        document.addEventListener("mousedown", outsideHandler);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
            document.removeEventListener("mousedown", outsideHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return ReactDOM.createPortal(
<<<<<<< HEAD
        <div>
=======
        <>
>>>>>>> main
            <ModalOverlay/>
            <div className={modalStyles.popup} ref={popupRef}>
                <div className={modalStyles.default__section}>
                    <h2 className={`text text_type_main-medium ${modalStyles.header}`}>{props.header}</h2>
                    <button onClick={props.onClose} className={modalStyles.close_button}>
                        <CloseIcon type='primary'/>
                    </button>
                </div>
                {props.children}
            </div>
<<<<<<< HEAD
        </div>,
=======
        </>,
>>>>>>> main
        document.getElementById('portal')
    )
}

<<<<<<< HEAD
=======
Modal.propTypes = {
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}
>>>>>>> main
export default Modal