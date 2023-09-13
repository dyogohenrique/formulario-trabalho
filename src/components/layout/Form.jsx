import { useState } from "react";

import styles from "./Form.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton"
import InputRadio from "../form/InputRadio";

function Form() {

    const submit = (e) => {
        e.preventDefault();
    }

    const [selectedOption, setSelectedOption] = useState("Masculino");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const options = [
        {value: "Masculino", label: "Masculino"},
        {value: "Feminino", label: "Feminino"}
    ];

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome"
                name="nome"
                placeholder="Digite o seu nome"
            />

            <Input
                type="text"
                text="Sobrenome"
                name="nome"
                placeholder="Digite o seu sobrenome"
            />

            <Input 
                type="email"
                text="E-mail"
                name="email"
                placeholder="exemplo@ex.com"
            />

            <InputRadio
                name="Sexo"
                options={options}
                selectOption={selectedOption}
                onChange={handleOptionChange}
            />

            <Input
                type="date"
                text="Data de nascimento"
                name="data_nascimento"
                customClass="date"
            />

            <SubmitButton
                text="Enviar"
            />
        </form>
    );
}

export default Form;