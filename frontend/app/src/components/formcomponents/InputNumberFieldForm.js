import React, { useState } from "react";

const InputNumberFieldForm = (props) => {
  const [fieldValue, setFieldValue] = useState(props.currentValue);

  const handleFieldChange = (e) => {
    setFieldValue(e.target.value);
  };
  return (
    <>
      <input
        placeholder={props.placeHolder}
        type="number"
        name={props.fieldName} //this will the key to identify the value
        value={fieldValue} //this will come from the parent
        onChange={handleFieldChange}
      />
    </>
  );
};

export default InputNumberFieldForm;
