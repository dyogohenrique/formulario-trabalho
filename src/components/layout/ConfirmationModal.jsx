import style from "./ConfirmationModal.module.css";

import Button from "../form/Button"

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <p>{message}</p>
        <div className={style.buttons}>
            <Button 
                text = "Confirmar"
                type="button"
                handleOnchange={onConfirm}
                customClass="dont"
            />
            <Button 
                text = "Cancelar"
                type="button"
                handleOnchange={onCancel}
            />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;