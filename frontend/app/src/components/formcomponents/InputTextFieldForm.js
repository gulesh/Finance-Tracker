import React, { useState } from "react";

const InputTextFieldForm = (props) => {
    const [fieldValue, setFieldValue] = useState(props.currentValue);

    const handleFieldChange = (e) => {
      console.log(e.target.value);
      setFieldValue(e.target.value);
    }
    return (
      <>
        <input
          placeholder={props.placeHolder}
          type="text"
          name={props.fieldName} //this will the key to identify the value
          value={fieldValue} //this will come from the parent
          onChange={handleFieldChange}
        />
      </>
    );
}

export default InputTextFieldForm;