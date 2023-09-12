import styles from "./Form.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton"

function Form() {

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Um texto"
                name="texto"
                placeholder="Texto"
            />
            <SubmitButton
                text="Enviar"
            />
        </form>
    );
}

export default Form;