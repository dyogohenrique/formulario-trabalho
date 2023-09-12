import styles from './SubmitButton.module.css';


/**
 * Cria um botão de submit
 * @param text Texto que aparece dentro do botão 
 * @returns retorna o botão de submit
 */
function SubmitButton({ text }) {
    return(
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}

export default SubmitButton;