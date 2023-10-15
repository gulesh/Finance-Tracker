import React from "react";
import Input from '../components/form-components/InputField'

/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */

export const CreateFormFieldConfig= (label, name, type, defaultValue= "") => {
    return {
      renderInput: (handleChange, value, isValid, error, key) => {
        return (
        <Input
          key={key}
          label={label}
          type={type}
          name={name}
          handleChange={handleChange}
          errorMessage={error}
          isValid={isValid}
          value={value}
        />)
      } ,
      label,
      value: defaultValue,
      valid: false,
      errorMessage:'',
      touched: false
    };
};

