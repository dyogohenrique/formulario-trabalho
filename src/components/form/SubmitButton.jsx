import styles from './SubmitButton.module.css';


/**
 * Cria um botão de submit
 * @param text Texto que aparece dentro do botão 
 * @returns retorna o botão de submit
 */
function SubmitButton({ text, name, type, handleOnchange,customClass }) {
    return(
        <div>
            <button 
                className={`${styles.btn} ${styles[customClass]}`}
                name={name} 
                id={name}
                type={type}
                onClick={handleOnchange}
            >
            {text}
            </button>
        </div>
    );
}

export default SubmitButton;