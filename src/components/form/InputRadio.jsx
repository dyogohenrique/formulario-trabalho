function InputRadio({ name, text, options, selectOption, onChange }) {
    return (
        <div>
            <label>{text}</label>
            <div>
                {options.map((option, index) => (
                    <label key={index}>
                        <input 
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectOption === option.value}
                            onChange={onChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default InputRadio;