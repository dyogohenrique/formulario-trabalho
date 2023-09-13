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
            <div className={styles.input_container}>
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
            </div>

            <Input 
                type="email"
                text="E-mail"
                name="email"
                placeholder="exemplo@ex.com"
            />

            <div className={styles.input_container}>
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
            </div>

            <div className={styles.button_container}>
                <SubmitButton
                    text="Enviar"
                />
                <SubmitButton text="Apagar tudo"/>
            </div>
        </form>
    );
}

export default Form;