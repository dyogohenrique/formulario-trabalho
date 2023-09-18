import { Link } from 'react-router-dom';
import {BsEye, BsFillTrashFill} from 'react-icons/bs'
import { useState } from 'react';

import style from "./Card.module.css"

import AdolescenteManina from "../img/AdolescenteMenina.png"
import AdolescenteManino from "../img/AdolescenteMenino.png"
import AdultoHomem from  "../img/AdultoHomem.png";
import AdultoMulher from  "../img/AdultoMulher.png";
import CriancaMenina from "../img/CriancaMenina.png"
import CriancaMenino from "../img/CriancaMenino.png"
import IdosoHomem from "../img/IdosoHomem.png"
import IdosoMulher from "../img/IdosoMulher.png"

import ConfirmationModal from '../layout/ConfirmationModal';

function Card({id, nome, sexo, idade, faixaEtaria, email, cep, handleRemove }) {

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const remove = (e) => {
        e.preventDefault();
        if (window.confirm('Tem certeza de que deseja remover este item?')) {
            handleRemove(id);
        }
    }

    function img() {
        if (faixaEtaria === "Criança") {
            if (sexo === "Masculino") {
                return CriancaMenino;
            }
            return CriancaMenina;
        } else if (faixaEtaria === "Adolescente") {
            if (sexo === "Masculino") {
                return AdolescenteManino
            }
            return AdolescenteManina;
        } else if (faixaEtaria === "Adulto") {
            if (sexo === "Masculino") {
                return AdultoHomem;
            }
            return AdultoMulher;
        } 

        if (sexo === "Masculino") {
            return IdosoHomem;
        }

        return IdosoMulher
    }

    return(
        <div className={style.person_card}>
            <div className={style.head}>
                <div>
                    <h4>{nome}</h4>
                    <p>{faixaEtaria}</p>
                </div>
                <div className={style.container_imagem}>
                    <img src={img()} alt="Imagem da pessoa" />
                </div>
            </div>

            <p>
                <span>Idade:</span> {idade} anos
            </p>
            
            <p>
                <span>Email:</span> {email}
            </p>

            <p>
                <span>CEP:</span> {cep}
            </p>
            <div className={style.person_card_actions}>
                <Link to={`/person/${id}`}>
                    <BsEye/> Visualisar
                </Link>
                <button onClick={() => setShowConfirmDialog(true)}>
                    <BsFillTrashFill/> Excluir
                </button>
                {showConfirmDialog && (
                    <ConfirmationModal 
                        message={`Tem certeza de que deseja remover o ${nome}?`}
                        onConfirm={remove}
                        onCancel={() => setShowConfirmDialog(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default Card;