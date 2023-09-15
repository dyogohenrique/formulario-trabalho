import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./Form.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton"
import InputRadio from "../form/InputRadio";

function Form({ handleSubmit, personData }) {

    function handleChange(e) {
        const {name, value} = e.target;
        let idade = person.idade;

        if (name === "data_nascimento") {
            idade = calcularIdade(value);
        }

        // setPerson({...person, [e.target.name]: e.target.value});
        setPerson({...person, [name]:value, idade})
    }

    // Input Rádio
    const [selectedOption, setSelectedOption] = useState("Masculino");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const options = [
        {value: "Masculino", label: "Masculino"},
        {value: "Feminino", label: "Feminino"}
    ];

    // Calcular a idade
    function calcularIdade(dataNascimento) {

        //Data do formulario
        const dataNascimentoArray = dataNascimento.split('-');
        const anosNascimento = parseInt(dataNascimentoArray[0]);
        const mesNascimento = parseInt(dataNascimentoArray[1]);
        const diaNascimento = parseInt(dataNascimentoArray[2]);

        //Data atual
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth();
        const diaAtual = dataAtual.getDate();

        let idade = anoAtual - anosNascimento;

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
    }

    //Envia os dados para o "banco de dados"
    const[person, setPerson] = useState(personData || {})

    const submit = (e) => {
        e.preventDefault();
        const updatedPerson = {
            ...person,
            Sexo: selectedOption
        };
        // console.log(updatedProject);
        handleSubmit(updatedPerson);
    }

    function apagarCampos() {
        
    }


    return (
        <form onSubmit={submit} className={styles.form} id="meuFormulario">
            <div className={styles.input_container}>
                <Input
                    type="text"
                    text="Nome"
                    name="nome"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}

                />
                <Input
                    type="text"
                    text="Sobrenome"
                    name="sobrenome"
                    placeholder="Digite o seu sobrenome"
                    handleOnChange={handleChange}

                />
            </div>

            <div className={styles.input_container}>
                <InputRadio
                    name="Sexo"
                    options={options}
                    selectOption={selectedOption}
                    onChange={handleOptionChange}
                    handleOnChange={handleChange}
                />
                <Input
                    type="date"
                    text="Data de nascimento"
                    name="data_nascimento"
                    customClass="date"
                    handleOnChange={handleChange}
                />
            </div>


            <div className={styles.input_Num_container}>
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="exemplo@ex.com"
                    customClass="email"
                    handleOnChange={handleChange}
                />
                
                <Input
                    type="number"
                    text="Nº de Telefone Celular"
                    name="numCelular"
                    customClass="num"
                    placeholder=""
                    handleOnChange={handleChange}
                />
                <Input
                    type="number"
                    text="Nº de Telefone Fixo"
                    name="numFixo"
                    customClass="num"
                    handleOnChange={handleChange}
                />
            </div>
            


            <div className={styles.endereco_container}>
                <Input
                    type="text"
                    text="CEP"
                    name="cep"
                    customClass="endereco"
                    className="cep"
                    handleOnChange={handleChange}
                />

                <div className="empty"></div>
                <div className="empty"></div>

                <Input
                    type="text"
                    text="Bairro"
                    name="bairro"
                    customClass="endereco"
                    className="bairro"
                    handleOnChange={handleChange}
                />
                <Input
                    type="text"
                    text="Rua"
                    name="rua"
                    customClass="endereco"
                    className="rua"
                    handleOnChange={handleChange}
                />
                <Input
                    type="number"
                    text="Nº"
                    name="numero"
                    customClass="endereco"
                    className="num"
                    handleOnChange={handleChange}
                />
            </div>

            <div className={styles.button_container}>
                <SubmitButton
                    text="Enviar"
                />
                <SubmitButton 
                    text="Apagar tudo"
                    id="apagar_formulario"
                    name="apagar_formulario"
                />
                <Link to="/resultados">
                    <SubmitButton
                        text="Resultados"
                    />
                </Link>
            </div>
        </form>
    );
}


export default Form;