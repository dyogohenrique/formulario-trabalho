import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Button from "../form/Button"

import AdolescenteManina from "../img/AdolescenteMenina.png"
import AdolescenteManino from "../img/AdolescenteMenino.png"
import AdultoHomem from  "../img/AdultoHomem.png";
import AdultoMulher from  "../img/AdultoMulher.png";
import CriancaMenina from "../img/CriancaMenina.png"
import CriancaMenino from "../img/CriancaMenino.png"
import IdosoHomem from "../img/IdosoHomem.png"
import IdosoMulher from "../img/IdosoMulher.png"

import style from "./Person.module.css"

function Person() {

    const {id} = useParams()

    const [person, setPerson] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/people/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json())
        .then((data) => {
            setPerson(data)
        })
        .catch((err) => console.log(err))
    },  [id])
    
    function dataNascimento(dataNascimento) {
        // Verifique se dataNascimento é válido antes de usar split
        if (dataNascimento) {
            const dataNascimentoArray = dataNascimento.split('-');
            const ano = dataNascimentoArray[0];
            const mes = dataNascimentoArray[1];
            const dia = dataNascimentoArray[2];

            return `${dia}/${mes}/${ano}`;
        } else {
            return ""; // Trate caso dataNascimento seja undefined
        }
    }

    function img() {
        if (person.faixaEtaria === "Criança") {
            if (person.Sexo === "Masculino") {
                return CriancaMenino;
            }
            return CriancaMenina;
        } else if (person.faixaEtaria === "Adolescente") {
            if (person.Sexo === "Masculino") {
                return AdolescenteManino
            }
            return AdolescenteManina;
        } else if (person.faixaEtaria === "Adulto") {
            if (person.Sexo === "Masculino") {
                return AdultoHomem;
            }
            return AdultoMulher;
        } 

        if (person.Sexo === "Masculino") {
            return IdosoHomem;
        }

        return IdosoMulher
    }

    return (
        <div>
            <div className={style.person_container}>
                <div className={style.info_container}>
                    <h1>{`${person.nome} ${person.sobrenome}`}</h1>
                    <p><span>Sexo: </span>{person.Sexo}</p>
                    <div className={style.idade}>
                        <p><span>Faixa Etária: </span>{person.faixaEtaria}</p>
                        <p><span>Data de nascimento: </span>{dataNascimento(person.data_nascimento)}</p>
                        <p><span>Idade: </span>{person.idade}</p>
                    </div>
                    <p><span>Email: </span>{person.email}</p>
                    <div className={style.numeros}>
                        <p><span>Telefone Celular: </span>{person.numCelular}</p>
                        <p><span>Telefone Fixo: </span>{person.numFixo}</p>
                    </div>
                    <p><span>Endereço: </span>Rua {person.rua}, {person.numero} - Bairro {person.bairro}. CEP: {person.cep}</p>
                </div>
                <img src={img()} alt="Imagem da Pessoa" />
            </div>

            <div className={style.btn}>
                <Link to="/people">
                    <Button text="Voltar"/>
                </Link>
            </div>
        </div>
    );
}

export default Person;