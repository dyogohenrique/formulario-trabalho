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


            <div className={styles.input_Num_container}>
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="exemplo@ex.com"
                    customClass="email"
                />
                
                <Input
                    type="number"
                    text="Nº de Telefone Celular"
                    name="numCelular"
                    customClass="num"
                    />
                <Input
                    type="number"
                    text="Nº de Telefone Fixo"
                    name="numFixo"
                    customClass="num"
                />
            </div>
            


            <div className={styles.endereco_container}>
                <Input
                    type="text"
                    text="CEP"
                    name="cep"
                    customClass="endereco"
                />
                <Input
                    type="text"
                    text="Bairro"
                    name="bairro"
                    customClass="endereco"
                />
                <Input
                    type="text"
                    text="Rua"
                    name="rua"
                    customClass="endereco"
                />
                <Input
                    type="number"
                    text="Nº"
                    name="numero"
                    customClass="endereco"
                />
            </div>

            <div className={styles.button_container}>
                <SubmitButton
                    text="Enviar"
                />
                <SubmitButton 
                    text="Apagar tudo"
                />
                <SubmitButton 
                    text="Resultados"
                />
            </div>
        </form>
    );
}


export default Form;