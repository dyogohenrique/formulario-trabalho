import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import SubmitButton from "../form/SubmitButton";

import style from './People.module.css'
import Card from "../project/Card";
import Message from "../layout/Message";


function People() {

    const [people, setPeople] = useState([]);
    const [peopleMessage, setPeopleMessage] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:5000/people', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => resp.json())
        .then(data => {
            setPeople(data)
        })
        .catch((err) => console.log(err))
    }, [])

    function removePerson (id) {

        fetch(`http://localhost:5000/people/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((resp => resp.json()))
        .then(() => {
            setPeople(people.filter((person) => person.id !== id))
            setPeopleMessage("Pessoa removida com sucesso!")

            setTimeout(() => {
                setPeopleMessage('');
            }, 5000);
        })
        .catch((err) => console.log(err))

    }

    return (
        <div className={style.resultado_container}>
            <div className={style.title_container}>
                <h1>Pessoas cadastradas</h1>
                <Link to="/"><SubmitButton text="Cadastrar"/></Link>
            </div>
            {peopleMessage && (
                <div className={style.message}>
                    <Message type="success" msg={peopleMessage} />
                </div>
            )}
            <div className={style.resultados}> 
                {people.length > 0 && 
                    people.map((person) => (
                        <Card
                            id={person.id}
                            nome={person.nome}
                            idade={person.idade}
                            faixaEtaria={person.faixaEtaria}
                            email={person.email}
                            cep={person.cep}
                            key={person.id}
                            handleRemove={removePerson}
                        />  
                    ))}
                    {people.length === 0 &&(
                        <p>Não há projetos cadastrados</p>
                    )}
            </div>
        </div>
    );
}

export default People;