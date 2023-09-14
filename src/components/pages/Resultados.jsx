import { Link } from "react-router-dom";

import SubmitButton from "../form/SubmitButton";

function Resultados() {
    return (
        <div>

            <h1>Resultados</h1>
            <Link to="/"><SubmitButton text="Cadastrar"/></Link>

        </div>
    );
}

export default Resultados;