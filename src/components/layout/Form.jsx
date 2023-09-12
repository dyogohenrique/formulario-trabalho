import { useState } from "react";

import styles from "./Form.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton"
import InputRadio from "../form/InputRadio";

function Form() {

    const submit = (e) => {
        e.preventDefault();
    }

    const [selectedOption, setSelectedOption] = useState("option1");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const options = [
        {value: "option1", label: "Opção 1"},
        {value: "option2", label: "Opção 2"}
    ];

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Um texto"
                name="texto"
                placeholder="Texto"
            />

            <InputRadio
                name="RadioGrupo"
                options={options}
                selectOption={selectedOption}
                onChange={handleOptionChange}
            />

            <SubmitButton
                text="Enviar"
            />
        </form>
    );
}

export default Form;