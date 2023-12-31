import React from "react";
import './input-field.css'

const Input = (props) => {
    const { label, type, name, handleChange, errorMessage, isValid, value }= props;

    return (
      <div className="inputContainer">
        <label htmlFor={name}>{label}</label>
        <input id={name} type={type} name={name} onChange={handleChange} value={value} />
        {errorMessage && !isValid && (
          <span className="error"> {errorMessage} </span>
        )}
      </div>
    );

}

export default React.memo(Input);;