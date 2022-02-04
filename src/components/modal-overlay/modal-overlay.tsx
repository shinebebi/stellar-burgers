import modalOverlayStyles from "./modal-overlay.module.css";
import React, {FC} from "react";

const ModalOverlay: FC = () => {
    return (
        <div className={modalOverlayStyles.modal__overlay}/>
    )
}
export default ModalOverlay