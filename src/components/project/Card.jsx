import { Link } from 'react-router-dom';
import {BsEye, BsFillTrashFill} from 'react-icons/bs'

import style from "./Card.module.css"

function Card({id, nome, idade, faixaEtaria, email, cep, handleRemove }) {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id)
    }

    return(
        <div className={style.person_card}>
            <h4>{nome}</h4>
            <p>{faixaEtaria}</p>
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
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    );
}

export default Card;