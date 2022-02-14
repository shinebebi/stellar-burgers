import React, {FC, ReactNode} from "react";
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ReactDOM from "react-dom"
import ModalOverlay from "../modal-overlay/modal-overlay"

type IModal = ReactNode & {
    header: string
    onClose: () => void;
};

const Modal: FC<IModal> = ({header, onClose, children}) => {
    const popupRef = React.useRef<any>(null);
    const escFunction = React.useCallback((event) => {
        if(event.key === "Escape") {
            onClose()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const outsideHandler = (event: any) => {
        if (!popupRef.current.contains(event.target)) {
            onClose()
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
        <>
            <ModalOverlay/>
            <div className={modalStyles.popup} ref={popupRef}>
                <div className={modalStyles.default__section}>
                    <h2 className={`text text_type_main-medium ${modalStyles.header}`}>{header}</h2>
                    <button onClick={onClose} className={modalStyles.close_button} data-cy='close-btn'>
                        <CloseIcon type='primary'/>
                    </button>
                </div>
                {children}
            </div>
        </>,
        document.getElementById('portal')!
    )
}
export default Modal