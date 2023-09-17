import { Link } from "react-router-dom";
import { useState } from "react";


import styles from "./Form.module.css";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton"
import InputRadio from "../form/InputRadio";
import Mask from "../form/Mask"

import Message from "../layout/Message";

function Form({ handleSubmit, personData }) {

    function handleChange(e) {
        const { name, value } = e.target;
        let idade = person.idade;
    
        if (name === "data_nascimento") {
            idade = calcularIdade(value);
            const faixaEtaria = determinarFaixaEtaria(idade, selectedOption);
    
            setPerson({ ...person, [name]: value, idade, faixaEtaria });
        } else if (name === "cep") {
            // Formatando o CEP para o formato "XXXXX-XXX"
            const formattedCEP = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
            if (formattedCEP.length === 8) {
                const formattedCEPWithDash = `${formattedCEP.slice(0, 5)}-${formattedCEP.slice(5)}`;
                setPerson({ ...person, [name]: formattedCEPWithDash });
            } else {
                setPerson({ ...person, [name]: value });
            } 
        } else {
            setPerson({ ...person, [name]: value });
        }
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

    function determinarFaixaEtaria(idade, sexo) {
        if (idade >= 0 && idade <= 13) {
          return "Criança";
        } else if (idade >= 14 && idade <= 17) {
          return "Adolescente";
        } else if (idade >= 18 && idade <= 59 ){
            if(sexo === "Feminino") {
                return "Adulta"
            }
          return "Adulto";
        } 

        if (sexo === "Feminino") {
            return "Idosa"
        }

        return "Idoso";
      }

    //Validar CEP 
    const [cepError, setCepError] = useState("");

    function validarCEP(cep) {
      const cepPattern = /^\d{5}-\d{3}$/;
      if (!cepPattern.test(cep)) {
        setCepError("Formato de CEP inválido. Use somente números.");
        return false;
      }
      return true;
    }

    //Validar o número da residência
    function validarNumeroResidencia(numeroResidencia) {
        const numeroRegex = /^[0-9]+$/; 
      
        if (!numeroRegex.test(numeroResidencia)) {
          return false;
        }
      
        return true;
    }

    function calcularDataMinima() {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear() - 100; // Subtraindo 100 anos
        const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adicionando zero à esquerda se necessário
        const diaAtual = String(dataAtual.getDate()).padStart(2, '0'); // Adicionando zero à esquerda se necessário
        return `${anoAtual}-${mesAtual}-${diaAtual}`;
    }
    
    function calcularDataMaxima() {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adicionando zero à esquerda se necessário
        const diaAtual = String(dataAtual.getDate()).padStart(2, '0'); // Adicionando zero à esquerda se necessário
        return `${anoAtual}-${mesAtual}-${diaAtual}`;
    }

    //Envia os dados para o "banco de dados"
    const[person, setPerson] = useState(personData || {})

    const [aviso, setAviso] = useState("");

    const initialFormState = {
        nome: "",
        sobrenome: "",
        data_nascimento: "", // Preencha com a data inicial desejada (por exemplo, "2023-01-01")
        email: "",
        numCelular: "",
        numFixo: "",
        cep: "",
        bairro: "",
        rua: "",
        numero: "",
      };

      const handleReset = () => {
        // Redefina os valores dos campos para seus valores iniciais
        setPerson(initialFormState);
        setSelectedOption("Masculino"); // Ou o valor padrão desejado para o campo de seleção de sexo
        setFormSubmitted(false);
      };

    const [formSubmitted, setFormSubmitted] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        if (!validarCEP(person.cep)) {
            setAviso(cepError);

            setTimeout(() => {
                setAviso('');
            }, 5000);

            return; // Não envia os dados se o CEP for inválido
        }

        const phoneNumberPattern = /^\(\d{2}\) \d{5}-\d{4}$/;

        if (!phoneNumberPattern.test(person.numCelular) || !phoneNumberPattern.test(person.numFixo)) {
            // Pelo menos um dos números de telefone é inválido, exiba um aviso
            setAviso("Pelo menos um número de telefone é inválido. Use o formato (99) 12345-6789.");

            setTimeout(() => {
                setAviso('');
            }, 5000);

            return;
        }

        if (person.numCelular === person.numFixo) {
            setAviso("Os números de telefone celular e fixo são iguais. Por favor, verifique.");

            setTimeout(() => {
                setAviso('');
            }, 5000);

            return; 
        } 

          // Validação do número da residência
        if (!validarNumeroResidencia(person.numero)) {
            setAviso("Número da residência inválido. Insira um número válido.");

            setTimeout(() => {
            setAviso('');
            }, 5000);

            return;
        }



        const updatedPerson = {
            ...person,
            Sexo: selectedOption
        };
        // console.log(updatedProject);
        handleSubmit(updatedPerson);

        setPerson(initialFormState);
        setSelectedOption("Masculino"); // Ou o valor padrão desejado para o campo de seleção de sexo
        setFormSubmitted(true);
    
        // Limpe o estado de submissão após um tempo (opcional)
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000); // Defina um tempo adequado para remover o estado de submissão
    }

    return (
        <form onSubmit={submit} className={styles.form} id="meuFormulario">
            <div className={styles.aviso}>
                {aviso &&
                        <Message type="error" msg={aviso} />
                }
            </div>

            <div className={styles.input_container}>
                <Input
                    type="text"
                    text="Nome"
                    name="nome"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.nome}
                />
                <Input
                    type="text"
                    text="Sobrenome"
                    name="sobrenome"
                    placeholder="Digite o seu sobrenome"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.sobrenome}

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
                    min={calcularDataMinima()} // Adicionando a data mínima
                    max={calcularDataMaxima()} // Adicionando a data máxima
                    value={formSubmitted ? "" : person.data_nascimento}
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
                    value={formSubmitted ? "" : person.email}
                />
                
                <Mask
                    mask="(99) 99999-9999"
                    type="tel"
                    text="Nº de Telefone Celular"
                    name="numCelular"
                    customClass="num"
                    placeholder="(00) 00000-0000"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.numCelular}
                />
                <Mask
                    mask="(99) 99999-9999"
                    type="tel"
                    text="Nº de Telefone Fixo"
                    name="numFixo"
                    customClass="num"
                    placeholder="(00) 00000-0000"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.numFixo}
                />
            </div>
            


            <div className={styles.endereco_container}>
                <Input
                    type="text"
                    text="CEP"
                    name="cep"
                    customClass="endereco"
                    className="cep"
                    maxLength="8"
                    minLength="8"
                    placeholder="00000000"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.cep}
                />

                <div className="empty"></div>
                <div className="empty"></div>

                <Input
                    type="text"
                    text="Bairro"
                    name="bairro"
                    customClass="endereco"
                    className="bairro"
                    placeholder="Nome do Bairro"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.bairro}
                />
                <Input
                    type="text"
                    text="Rua"
                    name="rua"
                    customClass="endereco"
                    className="rua"
                    placeholder="Nome da Rua"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.rua}
                />
                <Input
                    type="text"
                    text="Nº"
                    name="numero"
                    customClass="endereco"
                    className="num"
                    maxLength="5"
                    placeholder="Número da residência"
                    handleOnChange={handleChange}
                    value={formSubmitted ? "" : person.numero}
                />
            </div>

            <div className={styles.button_container}>
                <SubmitButton
                    text="Enviar"
                />

                <SubmitButton 
                    text="Apagar Tudo"
                    type="button"
                    handleOnchange={handleReset}
                />
                
                <Link to="/people">
                    <SubmitButton
                        text="Pessoas Cadastradas"
                    />
                </Link>
            </div>
            
        </form>
    );
}


export default Form;